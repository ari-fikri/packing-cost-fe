import json
import os

# This script adds the 'logistic_info' object to each 'cps' entry in dpi.json.

# Get the directory where the script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the path to dpi.json relative to the script's location
file_path = "/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe/src/data/dpi.json"

# The "logistic_info" object to be added
logistic_info_to_add = {
    "dock_code": "L",
    "address_rack": "FR-01-32",
    "process_type": "N"
}

try:
    # Read the JSON file
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Check if 'dpiData' key exists and is a list
    if 'dpiData' in data and isinstance(data['dpiData'], list):
        # Iterate over each item in the "dpiData" list
        for item in data['dpiData']:
            # Check if 'cps' key exists
            if 'cps' in item:
                item['cps']['logistic_info'] = logistic_info_to_add

    # Write the updated data back to the file
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
        f.write('\n')

    print(f"Successfully added 'logistic_info' to each 'cps' element in '{os.path.abspath(file_path)}'")

except FileNotFoundError:
    print(f"Error: The file at '{os.path.abspath(file_path)}' was not found.")
except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from the file.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")