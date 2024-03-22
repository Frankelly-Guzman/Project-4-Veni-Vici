import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Display from "./components/Display";
import BanList from "./components/BanList";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const QUERY = `https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}`;

function App() {
  const [data, setData] = useState(null);
  const [banList, setBanList] = useState([]);

  const callAPI = async () => {
    try {
      const response = await fetch(QUERY);
      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }
      const json = await response.json();
      setData(json[0]); // Assuming API returns an array, so we take the first element
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const addToBanList = (attribute) => {
    setBanList([...banList, attribute]);
  };

  return (
    <>
      <div className="App">
        <h1>Discover New Things</h1>
        <Button onClick={callAPI} />
        <Display data={data} addToBanList={addToBanList} />
        <BanList banList={banList} />
      </div>
    </>
  );
}

export default App;
