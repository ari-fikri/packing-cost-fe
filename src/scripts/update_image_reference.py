import json
import random
import os

# This script updates the 'files' array in each 'cps.images' object with a random image from the /assets/ folder.

# The script assumes it is run from the project root directory.
file_path = 'src/data/dpi.json'
assets_path = 'assets'

print(f"Attempting to update file: {os.path.abspath(file_path)}")

# Check if the file exists at the expected path
if not os.path.exists(file_path):
    print(f"Error: File not found at '{file_path}'. Please ensure you are running this script from the project root directory.")
    exit()

# Get image files from assets directory
try:
    image_files = [os.path.join('/assets', f) for f in os.listdir(assets_path) if f.endswith('.png')]
    if not image_files:
        print(f"Error: No .png images found in '{assets_path}' directory.")
        exit()
    print(f"Found images: {image_files}")
except FileNotFoundError:
    print(f"Error: Assets directory not found at '{assets_path}'. Please ensure you are running this script from the project root directory.")
    exit()


try:
    # Read the JSON file
    with open(file_path, 'r') as f:
        data = json.load(f)

    updated_count = 0
    # Check if 'dpiData' key exists and is a list
    if 'dpiData' in data and isinstance(data['dpiData'], list):
        # Iterate over each item in the "dpiData" list
        for item in data['dpiData']:
            # Check if 'cps' and 'images' and 'files' keys exist
            if 'cps' in item and 'images' in item['cps'] and 'files' in item['cps']['images']:
                # Assign a random image to the 'files' array
                item['cps']['images']['files'] = [random.choice(image_files)]
                updated_count += 1

    print(f"Successfully identified {updated_count} entries to update.")

    # Write the updated data back to the file
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
        f.write('\n')

    print(f"Successfully updated image references in '{os.path.abspath(file_path)}'")
    if updated_count == 0:
        print("Warning: No entries were updated. Please check the structure of your JSON file.")

except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from the file. It might be malformed.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")