import React, { useState, useEffect } from "react";
import axios from "axios";

const AutocompleteSearch = ({ count }) => {
  const [characters, setCharacters] = useState([]);
  const nameList = [];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?limit=149&${process.env.REACT_APP_MARVEL_API_KEY}`
      );

      setCharacters(response.data);

      //   for (let i = 0; i < characters.data.results.length; i++) {
      //     const name = characters.data.results[i].name;
      //     nameList.push(name);
      //   }
      //   console.log(nameList);
    } catch (error) {
      alert("An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(characters);

  return <span>AutocompleteSearch</span>;
};

export default AutocompleteSearch;
