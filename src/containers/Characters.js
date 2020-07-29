import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/Header";
import Pagination from "../components/Pagination";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(50);

  const fetchData = async () => {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?orderBy=name&limit=${limit}&offset=${offset}&ts=2&apikey=4bc2ab8d50fcdf2fde87bf58218d616e&hash=8dda0685be7a8530b6fca06239540f58`
      //   `http://gateway.marvel.com/v1/public/characters?${process.env.MARVEL_API_KEY}`
    );
    setCharacters(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  console.log(characters.data);

  return isLoading ? (
    <p className="offer">Downloading...</p>
  ) : (
    <>
      <Header />
      {characters.data.results.map((character) => {
        return (
          <div className="characters" key={character.id}>
            <img
              src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
              alt="marvel-character"
            />
            <div>
              <div>{character.name}</div>
              <div>{character.description}</div>
            </div>
          </div>
        );
      })}
      <Pagination
        count={characters.data.total}
        limit={limit}
        setPage={setPage}
        setOffset={setOffset}
      />
    </>
  );
};

export default Characters;
