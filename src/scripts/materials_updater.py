import json

# Define file paths
materials_file_path = "/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe/src/data/materials.json"
dpi_file_path = "/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe/src/data/dpi.json"

# Read materials.json
with open(materials_file_path, "r") as f:
    materials_data = json.load(f)

# Categorize materials
inner_materials = []
outer_materials = []
for material in materials_data:
    if material.get("materialType") in ["Inner", "Module"]:
        inner_materials.append(material)
    elif material.get("materialType") == "Outer":
        outer_materials.append(material)

# Read dpi.json
with open(dpi_file_path, "r") as f:
    dpi_data = json.load(f)

# Update dpi.json with categorized materials
for item in dpi_data.get("dpiData", []):
    if "cps" in item and "packing" in item["cps"]:
        item["cps"]["packing"]["inner"] = inner_materials
        item["cps"]["packing"]["outer"] = outer_materials

# Write updated data back to dpi.json
with open(dpi_file_path, "w") as f:
    json.dump(dpi_data, f, indent=2)

print("Successfully updated dpi.json with materials.")
