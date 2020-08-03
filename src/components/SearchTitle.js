import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchTitle = ({ setComics, order, limit, offset }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedTitle] = useDebounce(searchTitle, 1000);
  const [totalFound, setTotalFound] = useState(0);
  const [debouncedTotal] = useDebounce(totalFound, 1000);

  const params = {
    orderBy: order,
    limit,
    offset,
    title: searchTitle,
  };

  if (!searchTitle) {
    delete params.title;
  }

  const queryString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const handleTitleInputChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const fetchData = async () => {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?${queryString}&${process.env.REACT_APP_MARVEL_API_KEY}`
    );
    setComics(response.data);
    setTotalFound(response.data.data.total);
  };

  useEffect(() => {
    fetchData();
  }, [debouncedTitle]);

  return (
    <div className="search-bar">
      <div>
        <input
          type="text"
          placeholder="Search for a comic"
          value={searchTitle}
          onChange={handleTitleInputChange}
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
      {debouncedTitle && <div>Found {debouncedTotal} result(s)</div>}
    </div>
  );
};

export default SearchTitle;
