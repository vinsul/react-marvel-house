import React, { useState, useEffect } from "react";
import axios from "axios";
import AutocompleteSearch from "./AutocompleteSearch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchName = ({ isLoading, setIsLoading, characters, setCharacters, count }) => {
  const [searchName, setSearchName] = useState("");

  const params = {
    name: searchName,
  };

  if (!searchName) {
    delete params.name;
  }

  const queryString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const handleNameInputChange = (event) => {
    setSearchName(event.target.value);
  };

  const fetchData = async () => {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?${queryString}&${process.env.REACT_APP_MARVEL_API_KEY}`
      //   `http://gateway.marvel.com/v1/public/characters?${process.env.MARVEL_API_KEY}`
    );
    setCharacters(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchName]);

  return (
    <>
      {/* <AutocompleteSearch count={count} /> */}
      <div className="input-icon">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          value={searchName}
          onChange={handleNameInputChange}
        ></input>
      </div>
    </>
  );
};

export default SearchName;
