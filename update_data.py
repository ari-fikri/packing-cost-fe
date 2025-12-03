import json
import os

# --- IMPORTANT ---
# This script is designed to be run from within your project folder.
# It will read from:
# - src/data/models.json
# and write to:
# - src/data/generatedData.json
# ---

try:
    # Define the absolute path to your project's root directory
    PROJECT_ROOT = "/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe"
    
    MODELS_PATH = os.path.join(PROJECT_ROOT, 'src', 'data', 'models.json')
    GENERATED_DATA_PATH = os.path.join(PROJECT_ROOT, 'src', 'data', 'generatedData.json')

    # Read models.json
    print(f"Reading models data from {MODELS_PATH}...")
    with open(MODELS_PATH, 'r') as f:
        models_data = json.load(f)
    print("...done.")

    # Create a set of all destination codes from models.json for a reliable lookup.
    all_dest_codes = {m['model_destination_code'] for m in models_data if 'model_destination_code' in m and m['model_destination_code']}
    
    # Create a lookup map from models.json.
    # The key is a tuple of (model_cfc, model_destination_code, model_type)
    print("Creating a lookup map from models data...")
    models_lookup = {
        (m.get('model_cfc'), m.get('model_destination_code'), m.get('model_type')): m
        for m in models_data
    }
    print("...done.")

    # Read generatedData.json
    print(f"Reading generated data from {GENERATED_DATA_PATH}...")
    with open(GENERATED_DATA_PATH, 'r') as f:
        generated_data = json.load(f)
    print("...done.")

    update_count = 0
    not_found_count = 0
    # Iterate through cpsData and update the model object
    print("Updating generated data...")
    for item in generated_data.get('cpsData', []):
        item_model_cfc = item.get('model_cfc')
        item_model_type = item.get('cps', {}).get('model', {}).get('model_type')
        
        # --- Logic to find destination code from cpsNo ---
        item_dest_code = None
        cps_no = item.get('cpsNo', '')
        if cps_no:
            code_part = cps_no.split('.')[0]
            found_codes = []
            for dest_code in all_dest_codes:
                if dest_code in code_part:
                    found_codes.append(dest_code)
            
            if len(found_codes) == 1:
                item_dest_code = found_codes[0]
            elif len(found_codes) > 1:
                # If multiple codes are found (e.g., "A" and "AB"), prefer the longer one.
                item_dest_code = max(found_codes, key=len)

        # Create the composite key for lookup
        lookup_key = (item_model_cfc, item_dest_code, item_model_type)

        if lookup_key in models_lookup:
            model_info = models_lookup[lookup_key]
            
            if 'cps' not in item: item['cps'] = {}
            if 'model' not in item['cps']: item['cps']['model'] = {}
            cps_model = item['cps']['model']
            
            # Add/update the required fields
            cps_model['model_cfc'] = model_info.get('model_cfc')
            cps_model['model_implementation_period'] = model_info.get('model_implementation_period')
            cps_model['model_destination_code'] = model_info.get('model_destination_code')
            update_count += 1
        else:
            not_found_count += 1

    print(f"...updated {update_count} records.")
    if not_found_count > 0:
        print(f"...could not find a match for {not_found_count} records.")

    # Write the updated data back to generatedData.json
    print(f"Writing updated data back to {GENERATED_DATA_PATH}...")
    with open(GENERATED_DATA_PATH, 'w') as f:
        json.dump(generated_data, f, indent=2)
    print("...done.")
    
    print("\nScript finished successfully!")

except FileNotFoundError as e:
    print(f"\n--- ERROR ---")
    print(f"File not found: {e}.")
    print("Please ensure the script is in the correct project folder and the data files exist.")
except Exception as e:
    print(f"\n--- ERROR ---")
    print(f"An unexpected error occurred: {e}")