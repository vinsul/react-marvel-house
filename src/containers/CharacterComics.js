import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Loader from "../components/Loader";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";

const CharacterComics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [charactersComics, setCharactersComics] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [offset, setOffset] = useState(0);

  const params = useParams();

  let id = params.id;

  const fetchData = async () => {
    const params = {
      limit,
      offset,
    };

    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${id}/comics?orderBy=title&${queryString}&${process.env.REACT_APP_MARVEL_API_KEY}`
    );
    setCharactersComics(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, offset]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <div className="main-section-characters-comics">
        <div className="container">
          <h1>COMICS CONTAINING THIS CHARACTER</h1>
          <div>
            {charactersComics.data.results.map((charactersComic) => {
              return (
                <div
                  className="charactersComic"
                  key={charactersComic.id}
                >
                  <div>
                    <img
                      src={`${charactersComic.thumbnail.path}/standard_xlarge.${charactersComic.thumbnail.extension}`}
                      alt="marvel-character"
                    />
                    <div>
                      <h2>{charactersComic.title}</h2>
                      <div>{charactersComic.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="page-buttons">
          <Pagination
            count={charactersComics.data.total}
            limit={charactersComics.data.limit}
            setPage={setPage}
            setOffset={setOffset}
          />
        </div>
      </div>
      <Footer attributionText={charactersComics.attributionText} />
    </>
  );
};

export default CharacterComics;
