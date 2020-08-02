import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "./Loader";

const AutocompleteSearch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comicList, setComicList] = useState([]);
  // const [total] = useState(47226);

  let pageNumber = 47226 / 100;

  const rest = 47226 % 100;

  if (rest !== 0) {
    pageNumber = Math.floor(pageNumber) + 1;
  }

  const fetchData = async () => {
    const newList = [];
    try {
      for (let i = 1; i <= pageNumber; i++) {
        const newOffset = (i - 1) * 100;

        const response = await axios.get(
          `http://gateway.marvel.com/v1/public/comics?orderBy=title&limit=100&offset=${newOffset}&${process.env.REACT_APP_MARVEL_API_KEY}`
        );
        for (let j = 0; j < 100; j++) {
          newList.push(response.data.data.results[j].title);
        }
        setComicList(newList);
        setIsLoading(false);
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(comicList);

  return isLoading ? <Loader /> : <span>ok</span>;
};

export default AutocompleteSearch;
