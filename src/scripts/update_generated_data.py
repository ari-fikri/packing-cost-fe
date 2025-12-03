import json
import os

# --- IMPORTANT ---
# Please run this script from the root of your project folder:
# /Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe
#
# It will read from:
# - src/data/models.json
# and write to:
# - src/data/generatedData.json
# ---

try:
    # Construct absolute paths from the current working directory
    CWD = os.getcwd()
    MODELS_PATH = os.path.join(CWD, 'src', 'data', 'models.json')
    GENERATED_DATA_PATH = os.path.join(CWD, 'src', 'data', 'generatedData.json')

    # Read models.json
    print(f"Reading models data from {MODELS_PATH}...")
    with open(MODELS_PATH, 'r') as f:
        models_data = json.load(f)
    print("...done.")

    # Create a lookup map from models.json.
    # The key is a tuple of (model_cfc, model_destination_code, model_type)
    # to uniquely identify a model.
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
    # Iterate through cpsData and update the model object
    print("Updating generated data...")
    for item in generated_data.get('cpsData', []):
        # The key to find the corresponding model in models.json seems to be a composite
        # of cfc, destination code, and type.
        
        # 1. Get model_cfc from the top-level key.
        item_model_cfc = item.get('model_cfc')
        
        # 2. Get model_type from the nested cps.model object.
        item_model_type = item.get('cps', {}).get('model', {}).get('model_type')
        
        # 3. The destination code seems to be part of the 'cpsNo' string.
        # Example: "CPS588W807B004..." contains "807B".
        cps_no = item.get('cpsNo', '')
        item_dest_code = None
        if cps_no:
            # Assuming the destination code is a 4-character string of numbers and letters
            # found after the first few characters of the cpsNo. This is a best-effort guess.
            parts = cps_no.split('.')
            if len(parts) > 1:
                code_part = parts[0]
                # Simple search for a 4-char alphanumeric code. This might need adjustment
                # if the pattern is different.
                for i in range(len(code_part) - 3):
                    potential_code = code_part[i:i+4]
                    if potential_code.isalnum() and not potential_code.isalpha() and not potential_code.isdigit():
                         # A mix of letters and numbers is a good candidate.
                         # This is a heuristic and might not be perfect.
                         # Based on "807B", "722C", etc.
                         # A more robust solution would need a clear definition of how to extract the code.
                         # For now, we look for a likely candidate.
                         # Let's assume the first one we find is the one.
                         # A better heuristic might be to find one that exists in the models.json dest codes.
                         item_dest_code = potential_code
                         break # Taking the first likely candidate

        # Create the composite key for lookup
        lookup_key = (item_model_cfc, item_dest_code, item_model_type)

        if lookup_key in models_lookup:
            model_info = models_lookup[lookup_key]
            
            # Get the nested model object, creating it if it doesn't exist.
            if 'cps' not in item:
                item['cps'] = {}
            if 'model' not in item['cps']:
                item['cps']['model'] = {}
            cps_model = item['cps']['model']
            
            # Add/update the required fields from the found model_info
            cps_model['model_cfc'] = model_info.get('model_cfc')
            cps_model['model_implementation_period'] = model_info.get('model_implementation_period')
            cps_model['model_destination_code'] = model_info.get('model_destination_code')
            update_count += 1

    print(f"...updated {update_count} records.")

    # Write the updated data back to generatedData.json
    print(f"Writing updated data back to {GENERATED_DATA_PATH}...")
    with open(GENERATED_DATA_PATH, 'w') as f:
        json.dump(generated_data, f, indent=2)
    print("...done.")
    
    print("\nScript finished successfully!")

except FileNotFoundError as e:
    print(f"\n--- ERROR ---")
    print(f"File not found: {e}.")
    print("Please ensure you are running this script from the project root directory:")
    print("/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe")
except json.JSONDecodeError as e:
    print(f"\n--- ERROR ---")
    print(f"Error decoding JSON file: {e}.")
    print("Please check that your JSON files are not corrupted.")
except Exception as e:
    print(f"\n--- ERROR ---")
    print(f"An unexpected error occurred: {e}")