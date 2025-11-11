import json
import os

def reduce_packing_elements():
    """
    Reduces the number of elements in 'packing.inner' and 'packing.outer' arrays
    to 10 for each entry in the dpi.json file.
    """
    file_path = "/Users/arifikri/Downloads/TMMIN/price_calculator/packing-cost-fe/src/data/dpi.json"

    try:
        with open(file_path, 'r') as f:
            data = json.load(f)

        if 'dpiData' in data and isinstance(data['dpiData'], list):
            data_list = data['dpiData']
            for item in data_list:
                if 'cps' in item and 'packing' in item['cps']:
                    if 'inner' in item['cps']['packing'] and isinstance(item['cps']['packing']['inner'], list):
                        item['cps']['packing']['inner'] = item['cps']['packing']['inner'][:10]
                    if 'outer' in item['cps']['packing'] and isinstance(item['cps']['packing']['outer'], list):
                        item['cps']['packing']['outer'] = item['cps']['packing']['outer'][:10]
        else:
             print("Error: Could not find a 'dpiData' key with a list of items in the JSON file.")
             return

        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)

        print(f"Successfully reduced packing elements in {file_path}")

    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from the file {file_path}.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == '__main__':
    reduce_packing_elements()