import json
import random
import os

# This script updates the 'files' array in various 'images' objects within each 'cps' entry.

# The script assumes it is run from the project root directory.
file_path = 'src/data/dpi.json'
assets_path = 'assets'

print(f"--- Starting image reference update script ---")
print(f"Current working directory: {os.getcwd()}")
print(f"Attempting to update file: {os.path.abspath(file_path)}")

# Check if the file exists at the expected path
if not os.path.exists(file_path):
    print(f"Error: File not found at '{file_path}'. Please ensure you are running this script from the project root directory.")
    exit()

# Get image files from assets directory
try:
    print(f"Looking for assets in: {os.path.abspath(assets_path)}")
    asset_files = os.listdir(assets_path)
    print(f"Found files in assets directory: {asset_files}")
    image_files = [os.path.join('/assets', f) for f in asset_files if f.endswith('.png')]
    if not image_files:
        print(f"Error: No .png images found in '{assets_path}' directory.")
        exit()
    print(f"Found images to use: {image_files}")
except FileNotFoundError:
    print(f"Error: Assets directory not found at '{assets_path}'. Please ensure you are running this script from the project root directory.")
    exit()


try:
    # Read the JSON file
    print(f"Reading JSON file: {file_path}")
    with open(file_path, 'r') as f:
        data = json.load(f)
    print("JSON file read successfully.")

    updated_count = 0
    # Check if 'dpiData' key exists and is a list
    if 'dpiData' in data and isinstance(data['dpiData'], list):
        print(f"Found 'dpiData' with {len(data['dpiData'])} items.")
        # Iterate over each item in the "dpiData" list
        for i, item in enumerate(data['dpiData']):
            print(f"\n--- Processing dpiData item {i+1} ---")
            cps = item.get('cps')
            if not cps or not isinstance(cps, dict):
                print(f"Item {i+1}: 'cps' object not found or not a dictionary. Skipping.")
                continue
            print(f"Item {i+1}: Found 'cps' object.")

            images_obj = cps.get('images')
            if not images_obj or not isinstance(images_obj, dict):
                print(f"Item {i+1}: 'images' object not found in 'cps' or not a dictionary. Skipping.")
                continue
            print(f"Item {i+1}: Found 'images' object in 'cps'.")

            image_categories = ['part', 'packing', 'outer', 'qkp', 'bkp']
            
            for category in image_categories:
                print(f"Item {i+1}: Checking category '{category}'...")
                image_category_obj = images_obj.get(category)
                if not image_category_obj or not isinstance(image_category_obj, dict):
                    print(f"Item {i+1}: Category '{category}' not found or not a dictionary. Skipping.")
                    continue
                
                if 'files' in image_category_obj and isinstance(image_category_obj['files'], list):
                    print(f"Item {i+1}: Found 'files' list in '{category}'. Updating...")
                    if image_files:
                        image_category_obj['files'] = [random.choice(image_files)]
                        updated_count += 1
                        print(f"Item {i+1}: Successfully updated 'files' for '{category}'.")
                    else:
                        print(f"Item {i+1}: No images found to update with.")
                else:
                    print(f"Item {i+1}: 'files' key not found in '{category}' or it's not a list.")

    else:
        print("Error: 'dpiData' key not found in JSON or it's not a list.")


    print(f"\n--- Update summary ---")
    print(f"Total 'files' elements updated: {updated_count}.")

    if updated_count > 0:
        # Write the updated data back to the file
        print(f"Writing updated data back to '{os.path.abspath(file_path)}'")
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)
            f.write('\n')
        print("Successfully wrote updated data.")
    else:
        print("No changes were made, so not writing to file.")
        print("Please check the JSON structure and the script logic if you expected updates.")


except json.JSONDecodeError:
    print(f"Error: Could not decode JSON from the file. It might be malformed.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")