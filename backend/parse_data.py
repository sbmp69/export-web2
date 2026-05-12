import json
import re

raw_text = """
1. Prism Edge Lever Handle
Writing
Product Name: Prism Edge Lever Handle
Description: A bold geometric handle with sharp angular edges for modern architectural spaces.
Material: Solid Brass
Finish: Matte Black / Satin / Antique Brass
Type: Door Lever Handle
Application: Main Doors / Luxury Interiors
2. Flow Curve Lever Handle
Writing
Product Name: Flow Curve Lever Handle
Description: A sleek curved handle offering smooth grip and minimalist styling.
Material: Solid Brass
Finish: Rose Gold / Satin / Antique
Type: Door Lever Handle
Application: Interior Doors
3. Classic Round Lever Handle
Writing
Product Name: Classic Round Lever Handle
Description: A timeless round-base design combining simplicity and durability.
Material: Solid Brass
Finish: Satin / Chrome / Antique
Type: Door Lever Handle
Application: Residential Doors
4. Arc Hook Lever Handle
Writing
Product Name: Arc Hook Lever Handle
Description: A modern hook-style handle with ergonomic curved design.
Material: Solid Brass
Finish: Black / Satin / Gold
Type: Door Lever Handle
Application: Modern Interiors
5. Linear Bar Lever Handle
Writing
Product Name: Linear Bar Lever Handle
Description: Clean straight-line design for minimal and contemporary spaces.
Material: Solid Brass
Finish: Satin / Black / Antique
Type: Door Lever Handle
Application: Offices / Homes
6. Axis Square Lever Handle
Writing
Product Name: Axis Square Lever Handle
Description: Structured square base handle with bold architectural presence.
Material: Solid Brass
Finish: Satin / Matte Black
Type: Door Lever Handle
Application: Premium Interiors
7. Knurl Grip Lever Handle
Writing
Product Name: Knurl Grip Lever Handle
Description: Textured handle with knurled grip for industrial luxury styling.
Material: Solid Brass
Finish: Gold / Rose Gold
Type: Door Lever Handle
Application: Designer Spaces
8. Sculpt Curve Lever Handle
Writing
Product Name: Sculpt Curve Lever Handle
Description: Artistic curved form delivering a premium and elegant touch.
Material: Solid Brass
Finish: Satin / Antique
Type: Door Lever Handle
Application: Luxury Homes
9. Slim Edge Lever Handle
Writing
Product Name: Slim Edge Lever Handle
Description: Thin profile handle designed for modern minimal aesthetics.
Material: Solid Brass
Finish: Black / Satin
Type: Door Lever Handle
Application: Interior Doors
10. Dual Tone Lever Handle
Writing
Product Name: Dual Tone Lever Handle
Description: Contemporary handle combining two finishes for a unique look.
Material: Solid Brass
Finish: Black & Gold / Satin & Rose
Type: Door Lever Handle
Application: Premium Interiors
11. Rounded Edge Lever Handle
Writing
Product Name: Rounded Edge Lever Handle
Description: Soft rounded design ensuring comfort and smooth operation.
Material: Solid Brass
Finish: Satin / Chrome
Type: Door Lever Handle
Application: Residential Use
12. Flat Panel Lever Handle
Writing
Product Name: Flat Panel Lever Handle
Description: Wide flat handle with modern clean finish.
Material: Solid Brass
Finish: Antique / Satin
Type: Door Lever Handle
Application: Offices
13. Taper Edge Lever Handle
Writing
Product Name: Taper Edge Lever Handle
Description: Subtle tapered design offering sleek appearance.
Material: Solid Brass
Finish: Gold / Satin
Type: Door Lever Handle
Application: Interior Doors
14. Soft Curve Lever Handle
Writing
Product Name: Soft Curve Lever Handle
Description: Smooth flowing design for elegant interiors.
Material: Solid Brass
Finish: Rose Gold / Antique
Type: Door Lever Handle
Application: Homes
15. Industrial Knurl Lever Handle
Writing
Product Name: Industrial Knurl Lever Handle
Description: Heavy textured handle inspired by industrial design.
Material: Solid Brass
Finish: Gold / Black
Type: Door Lever Handle
Application: Luxury Projects
16. Designer Sculpt Lever Handle
Writing
Product Name: Designer Sculpt Lever Handle
Description: Premium artistic design with fluid shape.
Material: Solid Brass
Finish: Satin / Gold
Type: Door Lever Handle
Application: Designer Interiors
17. Edge Line Lever Handle
Writing
Product Name: Edge Line Lever Handle
Description: A sharp linear handle with clean edges, designed for modern architectural spaces.
Material: Solid Brass
Finish: Matte Black / Satin / Antique Brass
Type: Door Lever Handle
Application: Residential & Office Doors
18. Pure Form Lever Handle
Writing
Product Name: Pure Form Lever Handle
Description: Minimal and refined design focusing on simplicity and functionality.
Material: Solid Brass
Finish: Satin / Chrome / Antique
Type: Door Lever Handle
Application: Interior Doors
19. Modern Block Lever Handle
Writing
Product Name: Modern Block Lever Handle
Description: Bold block-style handle offering a strong and structured appearance.
Material: Solid Brass
Finish: Black / Satin / Gold
Type: Door Lever Handle
Application: Premium Interiors
20. Slim Bar Lever Handle
Writing
Product Name: Slim Bar Lever Handle
Description: A sleek bar-style handle ideal for minimal and contemporary designs.
Material: Solid Brass
Finish: Satin / Matte Black
Type: Door Lever Handle
Application: Modern Homes
21. Precision Lever Handle
Writing
Product Name: Precision Lever Handle
Description: Engineered with precise detailing for a clean and balanced look.
Material: Solid Brass
Finish: Satin / Antique
Type: Door Lever Handle
Application: Residential Use
22. Elite Curve Lever Handle
Writing
Product Name: Elite Curve Lever Handle
Description: Elegant curved design offering a premium and smooth touch.
Material: Solid Brass
Finish: Rose Gold / Satin
Type: Door Lever Handle
Application: Luxury Interiors
23. Urban Lever Handle
Writing
Product Name: Urban Lever Handle
Description: Contemporary design inspired by modern urban architecture.
Material: Solid Brass
Finish: Black / Satin / Chrome
Type: Door Lever Handle
Application: Offices & Apartments
24. Sharp Line Lever Handle
Writing
Product Name: Sharp Line Lever Handle
Description: Defined straight-line design for a bold and modern appearance.
Material: Solid Brass
Finish: Matte Black / Antique
Type: Door Lever Handle
Application: Designer Spaces
25. Angle Cut Lever Handle
Writing
Product Name: Angle Cut Lever Handle
Description: Unique angled cut design adding character to modern interiors.
Material: Solid Brass
Finish: Satin / Gold
Type: Door Lever Handle
Application: Premium Homes
26. Frame Lever Handle
Writing
Product Name: Frame Lever Handle
Description: Structured frame-style design delivering a bold architectural feel.
Material: Solid Brass
Finish: Satin / Black
Type: Door Lever Handle
Application: Commercial Interiors
27. Linear Edge Lever Handle
Writing
Product Name: Linear Edge Lever Handle
Description: Clean linear edges with a modern and minimal aesthetic.
Material: Solid Brass
Finish: Satin / Antique
Type: Door Lever Handle
Application: Interior Doors
28. Fusion Lever Handle
Writing
Product Name: Fusion Lever Handle
Description: A blend of classic and modern design elements for versatile use.
Material: Solid Brass
Finish: Gold / Black / Satin
Type: Door Lever Handle
Application: Residential & Commercial
29. Contour Lever Handle
Writing
Product Name: Contour Lever Handle
Description: Smooth contoured shape designed for comfort and elegance.
Material: Solid Brass
Finish: Rose Gold / Satin
Type: Door Lever Handle
Application: Luxury Interiors
30. Nova Lever Handle
Writing
Product Name: Nova Lever Handle
Description: Modern and sleek design with a futuristic aesthetic.
Material: Solid Brass
Finish: Black / Satin
Type: Door Lever Handle
Application: Contemporary Spaces
31. Aero Lever Handle
Writing
Product Name: Aero Lever Handle
Description: Lightweight design inspired by aerodynamic forms.
Material: Solid Brass
Finish: Satin / Chrome
Type: Door Lever Handle
Application: Modern Homes
32. Core Lever Handle
Writing
Product Name: Core Lever Handle
Description: Strong and simple design focused on durability and function.
Material: Solid Brass
Finish: Antique / Satin
Type: Door Lever Handle
Application: Everyday Use
33. Prism Mortise Handle Set
Writing
Product Name: Prism Mortise Handle Set
Description: Geometric handle with matching key plate for secure and stylish doors.
Material: Solid Brass
Finish: Black / Antique / Satin
Type: Mortise Handle Set
Application: Main Doors
34. Axis Mortise Handle
Writing
Product Name: Axis Mortise Handle
Description: Structured handle with clean lines and integrated key plate.
Material: Solid Brass
Finish: Satin / Black
Type: Mortise Handle
Application: Entry Doors
35. Classic Plate Handle
Writing
Product Name: Classic Plate Handle
Description: Traditional design with elegant plate and smooth lever.
Material: Solid Brass
Finish: Antique / Gold
Type: Mortise Handle
Application: Residential Doors
36. Square Plate Mortise Handle
Writing
Product Name: Square Plate Mortise Handle
Description: Modern square plate design with premium finish.
Material: Solid Brass
Finish: Satin / Black
Type: Mortise Handle
Application: Modern Interiors
37. Edge Plate Handle
Writing
Product Name: Edge Plate Handle
Description: Minimal plate handle with sharp and clean lines.
Material: Solid Brass
Finish: Satin / Antique
Type: Mortise Handle
Application: Offices
38. Designer Plate Handle
Writing
Product Name: Designer Plate Handle
Description: Premium designer handle with decorative plate styling.
Material: Solid Brass
Finish: Gold / Rose Gold
Type: Mortise Handle
Application: Luxury Homes
39. Modern Mortise Set
Writing
Product Name: Modern Mortise Set
Description: Contemporary handle set combining style and security.
Material: Solid Brass
Finish: Black / Satin
Type: Mortise Handle Set
Application: Main Doors
40. Elite Plate Handle
Writing
Product Name: Elite Plate Handle
Description: High-end plate handle with refined detailing.
Material: Solid Brass
Finish: Antique / Satin
Type: Mortise Handle
Application: Premium Interiors
41. Heritage Carved Pull Handle
Writing
Product Name: Heritage Carved Pull Handle
Description: Decorative carved design inspired by classic architecture.
Material: Solid Brass
Finish: Antique / Gold
Type: Pull Handle
Application: Main Doors
42. Royal Grip Pull Handle
Writing
Product Name: Royal Grip Pull Handle
Description: Strong and elegant pull handle with comfortable grip.
Material: Solid Brass
Finish: Gold / Antique
Type: Pull Handle
Application: Villas / Hotels
43. Knurl Pull Handle
Writing
Product Name: Knurl Pull Handle
Description: Textured grip design for modern industrial styling.
Material: Solid Brass
Finish: Black / Gold
Type: Pull Handle
Application: Glass Doors
44. Minimal Rod Pull Handle
Writing
Product Name: Minimal Rod Pull Handle
Description: Simple cylindrical handle for clean and modern look.
Material: Solid Brass
Finish: Satin / Rose Gold
Type: Pull Handle
Application: Offices
45. Dual Finish Pull Handle
Writing
Product Name: Dual Finish Pull Handle
Description: Combination of two finishes for a stylish contemporary design.
Material: Solid Brass
Finish: Black & Gold / Satin & Rose
Type: Pull Handle
Application: Premium Interiors
46. Linear Pull Handle
Writing
Product Name: Linear Pull Handle
Description: Straight and clean design for modern architectural spaces.
Material: Solid Brass
Finish: Satin / Black
Type: Pull Handle
Application: Main Doors
47. Pattern Pull Handle
Writing
Product Name: Pattern Pull Handle
Description: Decorative patterned surface for a unique visual appeal.
Material: Solid Brass
Finish: Gold / Antique
Type: Pull Handle
Application: Luxury Spaces
48. Classic Pull Handle
Writing
Product Name: Classic Pull Handle
Description: Traditional design suitable for timeless interiors.
Material: Solid Brass
Finish: Antique / Gold
Type: Pull Handle
Application: Residential Doors
49. Designer Pull Handle
Writing
Product Name: Designer Pull Handle
Description: Premium designer handle with modern styling.
Material: Solid Brass
Finish: Rose Gold / Satin
Type: Pull Handle
Application: Designer Interiors
50. Urban Pull Handle
Writing
Product Name: Urban Pull Handle
Description: Contemporary design suited for modern urban spaces.
Material: Solid Brass
Finish: Black / Satin
Type: Pull Handle
Application: Offices
51. Antique Pull Handle
Writing
Product Name: Antique Pull Handle
Description: Vintage-inspired design with antique finish.
Material: Solid Brass
Finish: Antique Brass
Type: Pull Handle
Application: Classic Interiors
52. Premium Bar Pull Handle
Writing
Product Name: Premium Bar Pull Handle
Description: Strong bar-style handle with clean modern finish.
Material: Solid Brass
Finish: Satin / Black
Type: Pull Handle
Application: Main Doors
53. Luxury Pull Handle
Writing
Product Name: Luxury Pull Handle
Description: High-end design crafted for premium spaces.
Material: Solid Brass
Finish: Gold / Rose Gold
Type: Pull Handle
Application: Villas / Hotels
54. Elite Pull Handle
Writing
Product Name: Elite Pull Handle
Description: Elegant and refined design for luxury interiors.
Material: Solid Brass
Finish: Satin / Antique
Type: Pull Handle
Application: Premium Projects
55. Knurl Cabinet Knob
Writing
Product Name: Knurl Cabinet Knob
Description: Textured knob designed for better grip and modern styling.
Material: Solid Brass
Finish: Black / Gold / Rose Gold
Type: Cabinet Knob
Application: Kitchen / Wardrobe
56. Minimal Cabinet Knob
Writing
Product Name: Minimal Cabinet Knob
Description: Clean and compact design for minimal interiors.
Material: Solid Brass
Finish: Satin / Chrome
Type: Cabinet Knob
Application: Cabinets / Drawers
"""

products = []
current_product = {}

lines = raw_text.strip().split('\n')
for line in lines:
    line = line.strip()
    if not line:
        continue
    
    # Check for number prefix
    match = re.match(r'^(\d+)\.\s+(.*)$', line)
    if match:
        if current_product:
            products.append(current_product)
        
        num = int(match.group(1))
        current_product = {
            "id": num,
            "image": f"/catalogue/product_{num}.jpeg",
        }
        continue
        
    if line == "Writing" or line.startswith("🔷"):
        continue
        
    if ":" in line:
        parts = line.split(":", 1)
        key = parts[0].strip()
        val = parts[1].strip()
        
        if key == "Product Name":
            current_product["name"] = val
        elif key == "Description":
            current_product["description"] = val
        elif key == "Material":
            current_product["material"] = val
        elif key == "Finish":
            current_product["finish"] = val
        elif key == "Type":
            current_product["type"] = val
            
            # Map type to category
            category = "Other"
            lower_val = val.lower()
            if "lever" in lower_val:
                category = "Lever Handle"
            elif "mortise" in lower_val:
                category = "Mortise Handle"
            elif "pull" in lower_val:
                category = "Pull Handle"
            elif "knob" in lower_val:
                category = "Cabinet Knob"
            current_product["category"] = category
            
        elif key == "Application":
            current_product["application"] = val

if current_product:
    products.append(current_product)

import os
output_path = r"e:\expoert web\frontend\src\data\catalogue.json"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {output_path} with {len(products)} products.")
