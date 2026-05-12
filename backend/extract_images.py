import fitz
import os

pdf_path = r"e:\expoert web\Scan document20260417_162235.pdf"
output_dir = r"e:\expoert web\frontend\public\catalogue"

os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

image_count = 1
for page_index in range(len(doc)):
    page = doc[page_index]
    images = page.get_images(full=True)
    if images:
        for img_index, img in enumerate(images):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            ext = base_image["ext"]
            image_path = os.path.join(output_dir, f"product_{image_count}.{ext}")
            
            with open(image_path, "wb") as f:
                f.write(image_bytes)
            print(f"Saved {image_path}")
            image_count += 1

print(f"Total extracted: {image_count - 1}")
