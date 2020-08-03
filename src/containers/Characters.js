import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Loader from "../components/Loader";
import Header from "../components/Header";
import SearchName from "../components/SearchName";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [offset, setOffset] = useState(0);
  const [order] = useState("name");

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
    }
    
    localStorage.setItem("myFavorites", JSON.stringify(newFavoriteCharacters));
  };

  // const removeCharacterToFavorites = (characterId) => {
  //   const favoritesStored = JSON.parse(localStorage.getItem("myFavorites"));

  //   let newFavoriteCharacters = [...favoritesStored];

  //   const filteredFavoritesCharacters = newFavoriteCharacters.filter(
  //     (favoriteCharacter) => favoriteCharacter.id !== characterId
  //   );
  //   localStorage.setItem(
  //     "myFavorites",
  //     JSON.stringify(filteredFavoritesCharacters)
  //   );
  // };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <div className="main-section-characters">
        <div className="container">
          <SearchName
            setCharacters={setCharacters}
            order={order}
            limit={limit}
            offset={offset}
          />
          <h1>MARVEL CHARACTERS</h1>
          <div>
            {characters.data.results.map((character) => {
              return (
                <div className="character" key={character.id}>
                  <div
                    onClick={() =>
                      history.push(`/characters/${character.id}/comics`)
                    }
                  >
                    <img
                      src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
                      alt="marvel-character"
                    />
                    <div>
                      <h2>{character.name}</h2>
                      <div>{character.description}</div>
                    </div>
                  </div>
                  <div onClick={() => addCharacterToFavorites(character.id)}>
                    + Add to favorites
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="page-buttons container">
          <Pagination
            count={characters.data.total}
            limit={limit}
            setPage={setPage}
            setOffset={setOffset}
          />
        </div>
      </div>
      <Footer attributionText={characters.attributionText} />
    </>
  );
};

export default Characters;
