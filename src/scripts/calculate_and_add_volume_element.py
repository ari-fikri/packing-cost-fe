import json

def calculate_and_add_volumes(filename="/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe/src/data/dpi.json"):
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: The file {filename} was not found.")
        return
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from the file {filename}.")
        return

    for item in data.get("dpiData", []):
        packing = item.get("packing", {})
        
        for material_type in ["inner", "outer"]:
            materials = packing.get(material_type, [])
            for material in materials:
                # Calculate inner volume
                try:
                    inner_w = material.get("dimension_inner_width", 0) or 0
                    inner_l = material.get("dimension_inner_length", 0) or 0
                    inner_h = material.get("dimension_inner_height", 0) or 0
                    material["volume_inner"] = inner_w * inner_l * inner_h
                except (TypeError, ValueError):
                    material["volume_inner"] = 0

                # Calculate outer volume
                try:
                    outer_w = material.get("dimension_outer_width", 0) or 0
                    outer_l = material.get("dimension_outer_length", 0) or 0
                    outer_h = material.get("dimension_outer_height", 0) or 0
                    material["volume_outer"] = outer_w * outer_l * outer_h
                except (TypeError, ValueError):
                    material["volume_outer"] = 0

    try:
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Successfully updated {filename} with calculated volumes.")
    except Exception as e:
        print(f"An error occurred while writing to the file: {e}")

if __name__ == "__main__":
    calculate_and_add_volumes()
