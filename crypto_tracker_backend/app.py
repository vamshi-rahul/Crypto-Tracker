# crypto-tracker-backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import requests

# Initialize the Flask application
app = Flask(__name__)
# Enable CORS so that your frontend can communicate with the backend
CORS(app)

# Define a route for fetching live cryptocurrency prices
@app.route('/api/cryptocurrencies/live-prices', methods=['GET'])

# Function to get live prices from API-ENDPOINT
def get_live_prices():
    # URL of the CoinGecko API endpoint for getting cryptocurrency market data
    url = 'https://api.coingecko.com/api/v3/coins/markets'
    # Parameters for the API request (e.g., currency in USD)
    params = {
        'vs_currency': 'usd',
        'order': 'market_cap_desc',
        'per_page': 10,
        'page': 1,
        'sparkline': 'false'
    }
    response = requests.get(url, params=params)# Make a GET request to the CoinGecko API
     # Return the JSON response
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to fetch data'}), response.status_code
    
# Function to get historical prices from API-ENDPOINT
@app.route('/api/cryptocurrencies/historical-prices/<symbol>', methods=['GET'])
def get_historical_prices(symbol):
    # URL for API-ENDPOINT to fetch historiocal market data.
    url = f'https://api.coingecko.com/api/v3/coins/{symbol}/market_chart'
    # Define the parameters:
    params = {
        'vs_currency': 'usd',
        'days': '30'
    }
    response = requests.get(url, params = params) # Making a GET request from the api to fetch data.
    # Return responce in JSON if request was susessful.
    if response.status_code == 200:
        data = response.json()
        # Format the data to our requirement:
        historical_data = [{'date': item[0], 'price': item[1]} for item in data['prices']]
        return jsonify(historical_data)
    else:
        return jsonify({'error':'Failed to fetch data'}), response.status_code
# Run the Flask application if this script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
