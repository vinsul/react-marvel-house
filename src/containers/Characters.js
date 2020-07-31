import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import SearchName from "../components/SearchName";
import Pagination from "../components/Pagination";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(50);
  const [order, SetOrder] = useState("name");

  const history = useHistory();

  const fetchData = async () => {
    const params = {
      orderBy: order,
      limit,
      offset,
    };

    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?${queryString}&${process.env.REACT_APP_MARVEL_API_KEY}`
    );
    setCharacters(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, order, limit, offset]);

  const addCharacterToFavorites = (characterId) => {
    const favoritesStored = JSON.parse(localStorage.getItem("myFavorites"));

    let newFavoriteCharacters = [];

    if (favoritesStored) {
      newFavoriteCharacters = [...favoritesStored];
    }

    const newFavoriteCharacter = characters.data.results.find(
      (character) => character.id === characterId
    );

    if (newFavoriteCharacter) {
      newFavoriteCharacter.category = "character";
      newFavoriteCharacters.push(newFavoriteCharacter);
      console.log(newFavoriteCharacters);
    }
    localStorage.setItem("myFavorites", JSON.stringify(newFavoriteCharacters));
  };

  const removeCharacterToFavorites = (characterId) => {
    const favoritesStored = JSON.parse(localStorage.getItem("myFavorites"));

    let newFavoriteCharacters = [...favoritesStored];

    const filteredFavoritesCharacters = newFavoriteCharacters.filter(
      (favoriteCharacter) => favoriteCharacter.id !== characterId
    );
    localStorage.setItem("myFavorites", JSON.stringify(filteredFavoritesCharacters));
  };

  return isLoading ? (
    <p className="offer">Downloading...</p>
  ) : (
    <>
      <Header />
      <SearchName
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        characters={characters}
        setCharacters={setCharacters}
        count={characters.data.total}
      />
      {characters.data.results.map((character) => {
        return (
          <div
            className="characters"
            key={character.id}
            // onClick={() => history.push(`/characters/${character.id}/comics`)}
          >
            <img
              src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
              alt="marvel-character"
            />
            <div>
              <div>{character.name}</div>
              <div>{character.description}</div>
              <div onClick={() => addCharacterToFavorites(character.id)}>
                + Ajouter aux favoris
              </div>
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
