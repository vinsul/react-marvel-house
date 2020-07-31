import React from "react";
import Header from "../components/Header";

const Favorites = () => {
  const favoritesList = JSON.parse(localStorage.getItem("myFavorites"));

  return (
    <>
      <Header />
      {/* {!favoritesList ? <span>Your favorite list is empty.</span> :  */}
      {favoritesList.map((favorite, index) => {
        return (
          <div
            className="favorites"
            key={index}
            // onClick={() => history.push(`/characters/${favorite.id}/comics`)}
          >
            <img
              src={`${favorite.thumbnail.path}/standard_xlarge.${favorite.thumbnail.extension}`}
              alt="marvel-character"
            />
            <div>{favorite.name}</div>
            <div>{favorite.description}</div>
          </div>
        );
      })}
    </>
  );
};

export default Favorites;
