import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import Login from './Login'
import ReactDOM from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import  { Moralis } from "moralis";


function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  Moralis.initialize("2QuiuXLrRJWgBhKNtIMisnEPqyETlJIZIoBAvkDY"); // Application id from moralis.io
  Moralis.serverURL = "https://vfdlfovt7end.usemoralis.com:2053/server"; //Server url from moralis.io

   const Login=()=>{
    console.log("login clicked");
    var user =  Moralis.Web3.authenticate();
    if(user){
      console.log("User: "+user);
      console.log("Logged In Successfully");
      user.set("nickname","VITALIK");
      user.set("fav_color","blue");
      user.save();
    };
  }

  return (

    
    <div className='coin-app'>
    <button className='login-btn' onClick={Login}>Login With Metamask</button>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search' />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h} />
        );
      })}
    
    </div>

  );
}

export default App;
