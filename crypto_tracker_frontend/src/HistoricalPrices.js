import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import 'chart.js/auto'

const HistoricalPrices = ({symbol}) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchHistoricalPrices = async () => {
            try{
                // Fetch the data from backend.
                const response = await axios.get(`http://127.0.0.1:5000/api/cryptocurrencies/historical-prices/${symbol}`);
                const data = response.data;

                // Prepare the data for the charts:
                const dates = data.map(entry => new Date(entry.date).toLocaleDateString());
                const prices = data.map(entry => entry.price);

                //console.log(dates, prices); // Debug : checking the data

                // Set the chart data:
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: `${symbol} Historical Prices`,
                            data: prices,
                            borderColor: 'rgba(75,192,192,1)',
                            backgroundColor: 'rgba(75,192,192,0.2)',
                        },
                    ],
                });
                setLoading(false);
            } 
            catch (error){
                console.error('Error fetching historical data', error);
                setError('Failed to fetch historical prices, Please Try Again.');
                setLoading(false);
            }
        };
        fetchHistoricalPrices();
    },[symbol]);
    if (loading){
        return <div>Loading...</div>;
    }
    if (error){
        return <div>{error}</div>;
    }

    return (
        <div className = "Historical Prices">
            <h1>{symbol} Historical Prices</h1>
            <Line data = {chartData} />
        </div>
    );
};

export default HistoricalPrices;