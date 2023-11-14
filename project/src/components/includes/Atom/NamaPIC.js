import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PicComponent = ({ onPicSuggestions }) => {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchPic = async () => {
      try {
        const response = await axios.get('https://jobcard-api.pins.co.id/api/task/each-user');
        const data = response.data.data;
        const picsSuggestions = data.map(pic => ({
        id: pic.id,
        name: pic.name
        }));
        setFetchedData(picsSuggestions);
        
        // Check if onPicSuggestions is a function before calling it
        if (typeof onPicSuggestions === 'function') {
          onPicSuggestions(picsSuggestions);
        }
      } catch (error) {
        console.error('Error fetching pic data:', error);
      }
    };

    fetchPic();
  }, [onPicSuggestions]);

  return null;
};

export default PicComponent;
