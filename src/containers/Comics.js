import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import SearchName from "../components/SearchName";
import Pagination from "../components/Pagination";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(50);
  const [order, SetOrder] = useState("title");

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
      `http://gateway.marvel.com/v1/public/comics?${queryString}&${process.env.REACT_APP_MARVEL_API_KEY}`
    );
    setComics(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, order, limit, offset]);

  const addComicToFavorites = (comicId) => {
    const favoritesStored = JSON.parse(localStorage.getItem("myFavorites"));

    let newFavoriteComics = [];

    if (favoritesStored) {
      newFavoriteComics = [...favoritesStored];
    }

    const newFavoriteComic = comics.data.results.find(
      (comic) => comic.id === comicId
    );

    if (newFavoriteComic) {
      newFavoriteComic.category = "comic";
      newFavoriteComics.push(newFavoriteComic);
      console.log(newFavoriteComics);
    }
    localStorage.setItem("myFavorites", JSON.stringify(newFavoriteComics));
  };

  const removeComicToFavorites = (comicId) => {
    const favoritesStored = JSON.parse(localStorage.getItem("myFavorites"));

    let newFavoriteComics = [...favoritesStored];

    const filteredFavoritesComics = newFavoriteComics.filter(
      (favoriteComic) => favoriteComic.id !== comicId
    );
    localStorage.setItem(
      "myFavorites",
      JSON.stringify(filteredFavoritesComics)
    );
  };

  return isLoading ? (
    <p className="offer">Downloading...</p>
  ) : (
    <>
      <Header />
      {/* <SearchName
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        comics={comics}
        setComics={setComics}
        count={comics.data.total}
      /> */}
      {comics.data.results.map((comic) => {
        return (
          <div className="comics" key={comic.id}>
            <img
              src={`${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`}
              alt="marvel-comic"
            />
            <div>
              <div>{comic.title}</div>
              <div>{comic.description}</div>
              <div onClick={() => addComicToFavorites(comic.id)}>
                + Ajouter aux favoris
              </div>
            </div>
          </div>
        );
      })}
      <Pagination
        count={comics.data.total}
        limit={limit}
        setPage={setPage}
        setOffset={setOffset}
      />
    </>
  );
};

export default Comics;
