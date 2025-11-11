import json
import os

# This script updates the 'pse_info' object for all entries in dpi.json.

# Get the directory where the script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the path to dpi.json relative to the script's location
file_path = "/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe/src/data/dpi.json"

# New content for the "pse_info" object
new_pse_info = {
    "packing_plant_curr": "STR 1",
    "packing_plant_next": "STR2",
    "vanning_plant_curr": "STR 3",
    "vanning_plant_next": "STR 4",
    "order_pattern_curr": "KRW 1",
    "order_pattern_next": "KRW 2"
}

try:
    # Read the JSON file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Check if 'dpiData' key exists and is a list
    if 'dpiData' in data and isinstance(data['dpiData'], list):
        # Iterate over each item in the "dpiData" list
        for item in data['dpiData']:
            if 'pse_info' in item:
                item['pse_info'] = new_pse_info

    # Write the updated data back to the file
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
        f.write('\n')

    print(f"Successfully updated 'pse_info' in '{os.path.abspath(file_path)}'")

except FileNotFoundError:
    print(f"Error: The file at '{os.path.abspath(file_path)}' was not found.")
except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from the file.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")