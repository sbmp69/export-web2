"""One-time image generation script for Alux Architectural brass rod visuals.

Runs: python /app/scripts/generate_brass_images.py
Saves PNG/JPG to /app/frontend/public/generated/
"""
import asyncio
import base64
import os
import sys
from pathlib import Path

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage  # noqa: E402

OUT_DIR = Path("/app/frontend/public/generated")
OUT_DIR.mkdir(parents=True, exist_ok=True)

BASE_STYLE = (
    "Ultra-premium cinematic studio photograph of polished solid BRASS "
    "(golden yellow metallic color, not copper, not gold, not silver, not steel). "
    "Dark moody matte-black backdrop, dramatic single-source rim lighting, "
    "shallow depth of field, sharp micro-detail on brass surface, soft reflections, "
    "luxury industrial B2B catalogue aesthetic, editorial fashion-style composition, "
    "hyper-realistic 8K macro photograph, no text, no watermark, no logos, no humans."
)

PROMPTS = [
    (
        "brass-rods-hero",
        "Bundle of long polished solid BRASS round rods stacked neatly on an angle, "
        "warm golden yellow metallic brass color with bright highlights on each cylindrical rod, "
        "industrial export warehouse styling, cinematic close-up, matte black background. "
        + BASE_STYLE,
    ),
    (
        "brass-rods-round",
        "Cluster of cylindrical round polished solid brass rods viewed end-on, "
        "showing perfectly circular brass cross-sections like golden coins packed together, "
        "extreme macro close-up on matte black background. " + BASE_STYLE,
    ),
    (
        "brass-rods-hex",
        "Stack of hexagonal (six-sided hex profile) polished solid brass rods viewed end-on, "
        "showing clean hexagonal cross-sections in warm golden brass metallic finish, "
        "tightly packed honeycomb pattern, extreme macro, matte black background. "
        + BASE_STYLE,
    ),
    (
        "brass-rods-square",
        "Stack of square-profile polished solid brass bars viewed end-on, "
        "showing crisp square cross-sections in warm golden brass color, "
        "precision-machined edges, tightly stacked grid pattern, macro close-up on matte black. "
        + BASE_STYLE,
    ),
    (
        "brass-rods-custom",
        "Assortment of custom extruded solid brass profiles — round, hex, square, "
        "L-shape and flat bars — laid in a diagonal editorial arrangement on matte black surface, "
        "warm golden brass metallic finish, premium B2B catalogue photograph, "
        "architectural hardware showcase. " + BASE_STYLE,
    ),
]


async def generate_one(slug: str, prompt: str) -> bool:
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        print("EMERGENT_LLM_KEY missing", flush=True)
        return False
    chat = LlmChat(
        api_key=api_key,
        session_id=f"alux-brass-{slug}",
        system_message="You are a premium commercial product photographer for luxury brass hardware.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"]
    )

    try:
        _text, images = await chat.send_message_multimodal_response(
            UserMessage(text=prompt)
        )
    except Exception as e:
        print(f"[{slug}] ERROR: {e}", flush=True)
        return False

    if not images:
        print(f"[{slug}] no images returned", flush=True)
        return False

    img = images[0]
    mime = img.get("mime_type", "image/png")
    ext = "png" if "png" in mime else "jpg"
    out_path = OUT_DIR / f"{slug}.{ext}"
    out_path.write_bytes(base64.b64decode(img["data"]))
    print(f"[{slug}] saved -> {out_path} ({out_path.stat().st_size} bytes)", flush=True)
    return True


async def main():
    results = []
    for slug, prompt in PROMPTS:
        ok = await generate_one(slug, prompt)
        results.append((slug, ok))
    print("\nSUMMARY:")
    for slug, ok in results:
        print(f"  {slug}: {'OK' if ok else 'FAILED'}")
    sys.exit(0 if all(r[1] for r in results) else 1)


if __name__ == "__main__":
    asyncio.run(main())
