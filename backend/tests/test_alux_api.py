"""Backend API tests for Alux Architectural site."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://architectural-metal.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root_ok(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "Alux" in data.get("message", "")


# ---------- Inquiries CRUD ----------
class TestInquiries:
    def test_create_inquiry_valid(self, session):
        payload = {
            "name": "TEST_User Alux",
            "email": "test_alux@example.com",
            "phone": "9099369442",
            "company": "TEST Co",
            "interest": "Door Handles",
            "message": "TEST inquiry message - automated test",
        }
        r = session.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "_id" not in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "created_at" in data
        # Save for next test
        pytest.created_inquiry_id = data["id"]
        pytest.created_inquiry_email = data["email"]

    def test_list_inquiries_no_id_leak_and_contains_created(self, session):
        r = session.get(f"{API}/inquiries", timeout=15)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        assert len(rows) >= 1
        for row in rows:
            assert "_id" not in row
            assert "id" in row
            assert "name" in row and "email" in row and "message" in row
        # Verify persistence of just-created inquiry
        ids = [row["id"] for row in rows]
        assert getattr(pytest, "created_inquiry_id", None) in ids

    def test_invalid_email_returns_422(self, session):
        payload = {
            "name": "TEST Bad Email",
            "email": "not-an-email",
            "message": "should fail",
        }
        r = session.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 422

    def test_missing_name_returns_422(self, session):
        payload = {"email": "test@example.com", "message": "no name"}
        r = session.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 422

    def test_missing_email_returns_422(self, session):
        payload = {"name": "TEST", "message": "no email"}
        r = session.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 422

    def test_missing_message_returns_422(self, session):
        payload = {"name": "TEST", "email": "test@example.com"}
        r = session.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 422

    def test_empty_name_returns_422(self, session):
        payload = {"name": "", "email": "test@example.com", "message": "x"}
        r = session.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 422


# ---------- New: Brass Rods Export interest values ----------
class TestBrassRodsExportInquiries:
    def test_create_inquiry_brass_rods_export(self, session):
        payload = {
            "name": "TEST_Export Buyer",
            "email": "test_export_uae@example.com",
            "phone": "+971501234567",
            "company": "TEST UAE Trading LLC",
            "interest": "Brass Rods · Export",
            "message": "TEST inquiry: please share MOQ and CIF Jebel Ali pricing for round CZ121 rods Ø 8-25mm.",
        }
        r = session.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["interest"] == "Brass Rods · Export"
        assert "_id" not in data
        assert "id" in data
        # GET to verify persistence
        list_r = session.get(f"{API}/inquiries", timeout=15)
        assert list_r.status_code == 200
        rows = list_r.json()
        match = next((row for row in rows if row["id"] == data["id"]), None)
        assert match is not None
        assert match["interest"] == "Brass Rods · Export"
        assert match["company"] == "TEST UAE Trading LLC"

    def test_create_inquiry_international_uae(self, session):
        payload = {
            "name": "TEST_International Inquiry",
            "email": "test_intl@example.com",
            "interest": "International / UAE",
            "message": "TEST: international project inquiry from UAE.",
        }
        r = session.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["interest"] == "International / UAE"


# ---------- New: Arabic / UTF-8 inquiry persistence ----------
class TestArabicInquiries:
    """Verify Arabic (UTF-8) name/message/interest are stored & returned correctly."""

    AR_NAME = "TEST_عميل تجريبي"
    AR_MESSAGE = "TEST: مرحبا، أرغب في الحصول على عرض أسعار لقضبان النحاس الأصفر بأقطار 8-25 ملم."
    AR_INTEREST = "قضبان النحاس · تصدير"

    def test_create_inquiry_arabic_utf8(self, session):
        payload = {
            "name": self.AR_NAME,
            "email": "test_arabic_user@example.com",
            "phone": "+971500000001",
            "company": "TEST شركة الإمارات",
            "interest": self.AR_INTEREST,
            "message": self.AR_MESSAGE,
        }
        r = session.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == self.AR_NAME
        assert data["interest"] == self.AR_INTEREST
        assert data["message"] == self.AR_MESSAGE
        assert data["company"] == "TEST شركة الإمارات"
        assert "id" in data and isinstance(data["id"], str)
        assert "_id" not in data
        # Round-trip through GET
        list_r = session.get(f"{API}/inquiries", timeout=15)
        assert list_r.status_code == 200
        # Force JSON decode through requests (handles UTF-8 decoding)
        rows = list_r.json()
        match = next((row for row in rows if row["id"] == data["id"]), None)
        assert match is not None, "Arabic inquiry not found in GET list"
        assert match["name"] == self.AR_NAME
        assert match["message"] == self.AR_MESSAGE
        assert match["interest"] == self.AR_INTEREST

    def test_create_inquiry_mixed_arabic_english(self, session):
        payload = {
            "name": "TEST_Ali علي",
            "email": "test_mixed@example.com",
            "interest": "Brass Rods · Export",
            "message": "Hello — مرحبا. Need pricing لقضبان النحاس CZ121.",
        }
        r = session.post(f"{API}/inquiries", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == "TEST_Ali علي"
        assert "مرحبا" in data["message"]
        assert "لقضبان النحاس" in data["message"]
