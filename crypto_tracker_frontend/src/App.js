import React from 'react';
import Prices from './prices'

function App() {
  return (
    <div className = "App">
      <header className = "App=header">
        <p>
          Welcome to Crypto Prices.
        </p>
      </header>
      <main>
        <Prices/>
      </main>
    </div>
  );
}

export default App;
