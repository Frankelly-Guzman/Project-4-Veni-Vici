import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import BanList from './BanList';
import History from './History';

const APIRequest = () => {
  const APIKEY = import.meta.env.VITE_API_ACCESS_KEY;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [banList, setBanList] = useState([]);
  const hasFetchedRef = useRef(false); // Ref to track if fetch has occurred

  const fetchAPI = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(`https://api.thedogapi.com/v1/images/search?api_key=${APIKEY}`);
      const fetchedData = response.data[0]; // Set data to the first item of the response array

      // Check if any attributes are in the ban list
      if (
        banList.some(ban => fetchedData.breeds && fetchedData.breeds.some(breed => breed.name === ban)) ||
        banList.some(ban => fetchedData.breeds && fetchedData.breeds.some(breed => breed.group === ban))
      ) {
        setLoading(false); // Skip this fetch if the attribute is banned
        return;
      }

      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetch attempt
    }
  };

  const getNewDog = async () => {
    setLoading(true);
    await fetchAPI();
  };

  const handleBanClick = (attribute) => {
    setBanList([...banList, attribute]);
  };

  const handleRemoveBan = (attribute) => {
    setBanList(banList.filter((item) => item !== attribute));
  };


  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchAPI(); // Fetch data only if it hasn't been fetched yet
      hasFetchedRef.current = true; // Mark as fetched
    }
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    if (data) {
      setHistory(prevHistory => [
        ...prevHistory,
        {
          url: data.url,
          breeds: data.breeds || [{ name: "Unknown Breed", group: "Unknown Group" }]
        }
      ]);
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100 text-center"> {/* Change items-start to items-center */}
      <div className="flex flex-col items-center p-4 bg-white rounded shadow-lg w-full max-w-lg">
        <motion.div 
          className="flex-1" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {loading ? (
            <p className="text-lg font-bold">Loading...</p>
          ) : (
            <div className="text-center">
              <img src={data.url} alt="Dog" className="w-full h-auto rounded mb-4" />
              <p className="text-xl font-semibold">{data.breeds[0]?.name || "Unknown Breed"}</p>
              <p className="text-md text-gray-600">{data.breeds[0]?.breed_group || "Unknown Group"}</p>
              <div className="flex justify-center mt-4">
                <button 
                  onClick={() => handleBanClick(data.breeds[0]?.name)} // Ban breed
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                >
                  Ban Breed
                </button>
                <button 
                  onClick={() => handleBanClick(data.breeds[0]?.breed_group)} // Ban group
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
                >
                  Ban Group
                </button>
                <button 
                  onClick={getNewDog} 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Fetch New Dog
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <BanList banList={banList}  onRemove={handleRemoveBan}/>
      <History history={history} />
    </div>
  );
};

export default APIRequest;