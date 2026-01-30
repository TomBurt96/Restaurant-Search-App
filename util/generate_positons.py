import pandas as pd
import requests

MAPBOX_TOKEN = ''

def get_mapbox_geo(query):
    # Mapbox treats search queries just like a Google Search
    url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{query}.json"
    params = {
        'access_token': MAPBOX_TOKEN,
        'limit': 1,
        'proximity': '-71.0589,42.3601' # Optional: Tells it to look in Boston first
    }
    
    try:
        response = requests.get(url, params=params)
        data = response.json()
        if data['features']:
            # Mapbox returns [Longitude, Latitude]
            lon, lat = data['features'][0]['center']
            return f"({lon}, {lat})" 
    except Exception as e:
        print(f"Error searching for {query}: {e}")
    
    return None

# Load and Process
df = pd.read_csv('./csvs/boston_restaurants_100.csv')

print("Starting Mapbox Geocoding...")
# We combine name and address for the best search result
df['position'] = df.apply(lambda row: get_mapbox_geo(f"{row['name']}, {row['address']}"), axis=1)

# Clean and Save
df.to_csv('boston_restaurants_with_geo.csv', index=False)
print(f"Finished! Found {df['position'].notnull().sum()} out of {len(df)} locations.")