import React, { useState, useEffect } from "react";
import Axios from "axios";

import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastComics, setLastComics] = useState([]);
  const [lastEvents, setLastEvents] = useState([]);

  const fetchData = async () => {
    try {
      const comicsResponse = await Axios.get(
        `https://gateway.marvel.com/v1/public/comics?orderBy=-focDate&limit=10&${process.env.REACT_APP_MARVEL_API_KEY}`
      );
      setLastComics(comicsResponse.data);

      const eventsResponse = await Axios.get(
        `https://gateway.marvel.com/v1/public/events?orderBy=-startDate&limit=10&${process.env.REACT_APP_MARVEL_API_KEY}`
      );
      setLastEvents(eventsResponse.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (event) => {
    alert("Feature under development");
  };

  console.log(lastComics);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <div className="main-home container">
        <div className="comics-section-home">
          <h2>Last comics</h2>
          <div>
            {lastComics.data.results.map((lastComic) => {
              return (
                <div
                  className="lastComics"
                  key={lastComic.id}
                  onClick={handleClick}
                >
                  <img
                    src={`${lastComic.thumbnail.path}/portrait_fantastic.${lastComic.thumbnail.extension}`}
                    alt="marvel-comic"
                  />
                  <div>{lastComic.title}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="events-section-home">
          <h2>Last events</h2>
          <div>
            {lastEvents.data.results.map((lastEvent) => {
              return (
                <div className="lastEvents" key={lastEvent.id}>
                  <img
                    src={`${lastEvent.thumbnail.path}/portrait_fantastic.${lastEvent.thumbnail.extension}`}
                    alt="marvel-event"
                  />
                  <div>{lastEvent.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer attributionText={lastComics.attributionText} />
    </>
  );
};

export default Home;
