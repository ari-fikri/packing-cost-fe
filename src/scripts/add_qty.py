import json
import random

dpi_file_path = "/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe/src/data/dpi.json"

try:
    # Read dpi.json
    with open(dpi_file_path, "r") as f:
        dpi_data = json.load(f)

    def reorder_material(material):
        # Ensure qty exists, if not, add it with a random value
        if 'qty' not in material:
            material['qty'] = random.randint(1, 3)

        # Create a new dictionary to control key order
        new_material = {}

        # Find the material number key ('material_no' or 'materialNo')
        mat_no_key = None
        if 'material_no' in material:
            mat_no_key = 'material_no'
        elif 'materialNo' in material:
            mat_no_key = 'materialNo'

        # Add material number and qty first
        if mat_no_key:
            new_material[mat_no_key] = material[mat_no_key]
        
        new_material['qty'] = material['qty']

        # Add the rest of the keys
        for key, value in material.items():
            if key != mat_no_key and key != 'qty':
                new_material[key] = value
        
        return new_material

    # Iterate through each item in dpiData and update materials
    for item in dpi_data.get("dpiData", []):
        if "cps" in item and "packing" in item["cps"]:
            # Update inner materials
            if "inner" in item["cps"]["packing"]:
                item["cps"]["packing"]["inner"] = [reorder_material(m.copy()) for m in item["cps"]["packing"]["inner"]]
            
            # Update outer materials
            if "outer" in item["cps"]["packing"]:
                item["cps"]["packing"]["outer"] = [reorder_material(m.copy()) for m in item["cps"]["packing"]["outer"]]

    # Write updated data back to dpi.json
    with open(dpi_file_path, "w") as f:
        json.dump(dpi_data, f, indent=2)

    print("Successfully reordered the 'qty' key in materials within dpi.json.")

except FileNotFoundError:
    print(f"Error: The file at {dpi_file_path} was not found.")
except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from the file at {dpi_file_path}.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
