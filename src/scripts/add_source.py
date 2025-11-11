import json
import random

dpi_file_path = "/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe/src/data/dpi.json"

try:
    # Read dpi.json
    with open(dpi_file_path, "r") as f:
        dpi_data = json.load(f)

    def reorder_material(material):
        """Reorders keys to place 'qty' and 'source' after the material number."""
        new_material = {}
        
        mat_no_key = 'material_no' if 'material_no' in material else 'materialNo'

        if mat_no_key in material:
            new_material[mat_no_key] = material[mat_no_key]
        
        # Add qty and source if they exist
        if 'qty' in material:
            new_material['qty'] = material['qty']
        if 'source' in material:
            new_material['source'] = material['source']

        # Add the rest of the keys
        for key, value in material.items():
            if key not in new_material:
                new_material[key] = value
        
        return new_material

    def process_materials(materials):
        """Adds 'source' key and ensures 'qty' exists for a list of materials."""
        if not materials:
            return []

        # Process the first material
        first_material = materials[0]
        first_material['source'] = 'TMMIN'
        if 'qty' not in first_material:
            first_material['qty'] = random.randint(1, 3)

        # Process the rest of the materials
        for material in materials[1:]:
            material['source'] = random.choice(['TMMIN', 'Supplier'])
            if 'qty' not in material:
                material['qty'] = random.randint(1, 3)
        
        # Reorder keys for all materials
        return [reorder_material(m) for m in materials]

    # Iterate through each item in dpiData and update materials
    for item in dpi_data.get("dpiData", []):
        if "cps" in item and "packing" in item["cps"]:
            if "inner" in item["cps"]["packing"]:
                item["cps"]["packing"]["inner"] = process_materials(item["cps"]["packing"]["inner"])
            
            if "outer" in item["cps"]["packing"]:
                item["cps"]["packing"]["outer"] = process_materials(item["cps"]["packing"]["outer"])

    # Write updated data back to dpi.json
    with open(dpi_file_path, "w") as f:
        json.dump(dpi_data, f, indent=2)

    print("Successfully added 'source' key and updated materials in dpi.json.")

except FileNotFoundError:
    print(f"Error: The file at {dpi_file_path} was not found.")
except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from the file at {dpi_file_path}.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
