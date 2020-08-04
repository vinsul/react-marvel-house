import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchName = ({ setCharacters, order, limit, offset }) => {
  const [searchName, setSearchName] = useState("");
  const [debouncedName] = useDebounce(searchName, 1000);
  const [totalFound, setTotalFound] = useState(0);
  const [debouncedTotal] = useDebounce(totalFound, 1000);

  const params = {
    orderBy: order,
    limit,
    offset,
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
      `https://gateway.marvel.com/v1/public/characters?${queryString}&${process.env.REACT_APP_MARVEL_API_KEY}`
    );
    setCharacters(response.data);
    setTotalFound(response.data.data.total);
  };

  useEffect(() => {
    fetchData();
  }, [debouncedName]);

  return (
    <div className="search-bar">
      <div>
        <input
          type="text"
          placeholder="Search for a character"
          value={searchName}
          onChange={handleNameInputChange}
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
      {debouncedName && <div>Found {debouncedTotal} result(s)</div>}
    </div>
  );
};

export default SearchName;
