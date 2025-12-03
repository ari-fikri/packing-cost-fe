import json
import os

def main():
    """
    This script updates the generatedData.json file by adding
    model_implementation_period and model_destination_code to the cps.model object
    for each entry, based on a lookup from models.json.
    """
    try:
        # Define paths relative to the script's location
        script_dir = os.path.dirname(os.path.abspath(__file__))
        models_path = os.path.join('src', 'data', 'models.json')
        generated_data_path = os.path.join('src', 'data', 'generatedData.json')

        print(f"Script running from: {script_dir}")
        print("--- Starting data update process ---")

        # --- Read models.json ---
        print(f"1. Reading models data from: {models_path}")
        try:
            with open(models_path, 'r', encoding='utf-8') as f:
                models_data = json.load(f)
            print(f"   ...successfully loaded {len(models_data)} model entries.")
        except FileNotFoundError:
            print(f"   ERROR: models.json not found at {models_path}")
            return
        except json.JSONDecodeError as e:
            print(f"   ERROR: Invalid JSON in models.json: {e}")
            return

        # --- Print model_cfc and model_type from models.json ---
        print("\n--- Models from models.json ---")
        for model in models_data:
            model_cfc = model.get('model_cfc', 'N/A')
            model_type = model.get('model_type', 'N/A')
            print(f"  model_cfc: {model_cfc}, model_type: {model_type}")
        print("---------------------------------\n")

        # Create a lookup dictionary from models.json
        # The key is a tuple of (model_cfc, model_type)
        # This assumes that (model_cfc, model_type) uniquely identifies a model.
        # If this is not the case, the logic needs to be adjusted.
        models_lookup = {}
        duplicate_keys = set()
        for model in models_data:
            key = (model.get('model_cfc'), model.get('model_type'))
            if key in models_lookup:
                # Handle potential duplicates - for now, we warn and skip
                if key not in duplicate_keys:
                    print(f"   WARNING: Duplicate key found in models.json: {key}. Skipping subsequent entries.")
                    duplicate_keys.add(key)
            else:
                models_lookup[key] = model
        
        print(f"   ...created lookup map with {len(models_lookup)} unique (model_cfc, model_type) pairs.")

        # --- Read generatedData.json ---
        print(f"2. Reading generated data from: {generated_data_path}")
        try:
            with open(generated_data_path, 'r', encoding='utf-8') as f:
                generated_data = json.load(f)
            cps_data = generated_data.get('cpsData', [])
            print(f"   ...successfully loaded {len(cps_data)} CPS data entries.")
        except FileNotFoundError:
            print(f"   ERROR: generatedData.json not found at {generated_data_path}")
            return
        except json.JSONDecodeError as e:
            print(f"   ERROR: Invalid JSON in generatedData.json: {e}")
            return

        # --- Print model_cfc and model_type from generatedData.json ---
        print("\n--- Models from generatedData.json ---")
        if 'cpsData' in generated_data:
            for item in generated_data['cpsData']:
                model_cfc = item.get('model_cfc', 'N/A')
                model_type = item.get('cps', {}).get('model', {}).get('model_type', 'N/A')
                print(f"  model_cfc: {model_cfc}, model_type: {model_type}")
        print("--------------------------------------\n")

        # --- Process and Update Data ---
        print("3. Updating CPS data entries...")
        updated_count = 0
        not_found_count = 0

        for item in cps_data:
            # Get the required fields from the current item
            item_model_cfc = item.get('model_cfc')
            cps_model = item.get('cps', {}).get('model', {})
            item_model_type = cps_model.get('model_type')

            if not item_model_cfc or not item_model_type:
                # Skip items that don't have the necessary keys to perform a lookup
                not_found_count += 1
                continue 

            # Create the lookup key
            lookup_key = (item_model_cfc, item_model_type)

            if lookup_key in models_lookup:
                model_info = models_lookup[lookup_key]
                
                # Ensure the cps.model path exists
                if 'cps' not in item:
                    item['cps'] = {}
                if 'model' not in item['cps']:
                    item['cps']['model'] = {}
                
                # Update the model object with the new fields
                item['cps']['model']['model_cfc'] = model_info.get('model_cfc')
                item['cps']['model']['model_implementation_period'] = model_info.get('model_implementation_period')
                item['cps']['model']['model_destination_code'] = model_info.get('model_destination_code')
                
                updated_count += 1
            else:
                not_found_count += 1
                # Optional: print a warning for items not found
                # print(f"   WARNING: No matching model found for key {lookup_key}")

        print(f"   ...updated {updated_count} entries.")
        if not_found_count > 0:
            print(f"   ...{not_found_count} entries could not be updated (missing lookup key or no match).")

        # --- Write updated data back ---
        print(f"4. Writing updated data back to: {generated_data_path}")
        try:
            with open(generated_data_path, 'w', encoding='utf-8') as f:
                # Use indent for pretty printing, which makes the file larger but easier to inspect
                json.dump(generated_data, f, indent=2, ensure_ascii=False) 
            print("   ...data written successfully.")
        except Exception as e:
            print(f"   ERROR: Failed to write to generatedData.json: {e}")
            return

        print("\n--- Data update process completed successfully! ---")

    except Exception as e:
        print(f"\n--- An unexpected error occurred: {e} ---")

if __name__ == "__main__":
    main()