import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";

const CharacterComics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [charactersComics, setCharactersComics] = useState([]);
  const params = useParams();

  let id = params.id;

  const fetchData = async () => {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${id}/comics?orderBy=title&limit=10&${process.env.REACT_APP_MARVEL_API_KEY}`
    );
    setCharactersComics(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <p className="offer">Downloading...</p>
  ) : (
    <>
      <Header />
      {charactersComics.data.results.map((charactersComic) => {
        return (
          <div className="charactersComic" key={charactersComic.id}>
            <img
              src={`${charactersComic.thumbnail.path}/standard_xlarge.${charactersComic.thumbnail.extension}`}
              alt="marvel-character"
            />
            <div>
              <div>{charactersComic.title}</div>
              <div>{charactersComic.description}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CharacterComics;
