import json
import os
from collections import OrderedDict

# This script is in src/scripts/, and the data file is in src/data/.
# This constructs the correct path from the script's location.
script_dir = os.path.dirname(__file__)
file_path = os.path.abspath(os.path.join(script_dir, '..', 'data', 'dpi.json'))

try:
    # Reading the JSON file
    with open(file_path, 'r', encoding='utf-8') as f:
        # Use OrderedDict to preserve key order
        data = json.load(f, object_pairs_hook=OrderedDict)
except FileNotFoundError:
    print(f"Error: The file {file_path} was not found.")
    exit()
except json.JSONDecodeError:
    print(f"Error: The file {file_path} is not a valid JSON file.")
    exit()

# Check if 'dpiData' exists and is a list
if 'dpiData' in data and isinstance(data['dpiData'], list):
    for item in data['dpiData']:
        if 'cps' in item and isinstance(item['cps'], dict):
            cps_data = item['cps']
            new_cps_data = OrderedDict()
            supplier_found = False
            for key, value in cps_data.items():
                new_cps_data[key] = value
                if key == 'supplier':
                    supplier_found = True
                    new_cps_data['part_status'] = 'New'
                    new_cps_data['Detail part_status'] = 'New/Uniqe Export'
                    new_cps_data['Packing Spec Status'] = 'New'

            if not supplier_found:
                # If supplier is not found, add the new keys at the end of cps object
                new_cps_data['part_status'] = 'New'
                new_cps_data['Detail part_status'] = 'New/Uniqe Export'
                new_cps_data['Packing Spec Status'] = 'New'

            item['cps'] = new_cps_data

    # Write the updated data back to the file
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    print(f"Successfully updated {file_path}")
else:
    print("Error: 'dpiData' key not found or is not a list in the JSON file.")