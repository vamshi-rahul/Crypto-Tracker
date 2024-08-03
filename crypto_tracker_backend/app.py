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


# Run the Flask application if this script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
