import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import AutocompleteSearch from "../components/AutocompleteSearch";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [offset, setOffset] = useState(0);
  const [order] = useState("title");

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

  console.log(comics);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <AutocompleteSearch />
      <div className="main-section-comics">
        <div className="container">
          <h1>MARVEL COMICS</h1>
          <div>
            {comics.data.results.map((comic) => {
              return (
                <div className="comics" key={comic.id}>
                  <div>
                    <img
                      src={`${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`}
                      alt="marvel-comic"
                    />
                    <div>
                      <h2>{comic.title}</h2>
                    </div>
                  </div>
                  <div onClick={() => addComicToFavorites(comic.id)}>
                    + Ajouter aux favoris
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="page-buttons container">
          <Pagination
            count={comics.data.total}
            limit={limit}
            setPage={setPage}
            setOffset={setOffset}
          />
        </div>
      </div>
      <Footer attributionText={comics.attributionText} />
    </>
  );
};

export default Comics;
