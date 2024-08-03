import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Prices = () => {
  const [prices, setPrices] = useState([]); // State to store prices
  const [search, setSearch] = useState(''); // State to store search input

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Make a GET request to the Flask backend to fetch cryptocurrency prices
        const response = await axios.get('http://127.0.0.1:5000/api/cryptocurrencies/live-prices');
        // Store the fetched data to the state "setPrices"
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    // Call the function to fetch prices
    fetchPrices();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter prices based on the search input
  const filteredPrices = prices.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredPrices.map((coin) => (
          <li key={coin.id}>
            {coin.name}: ${coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prices;
