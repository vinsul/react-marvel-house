import React from "react";
import Header from "../components/Header";

const Favorites = () => {
  const favoritesList = JSON.parse(localStorage.getItem("myFavorites"));

  const favoriteComics = favoritesList.filter(
    (favoriteComic) => favoriteComic.category === "comic"
  );

  const favoriteCharacters = favoritesList.filter(
    (favoriteCharacter) => favoriteCharacter.category === "character"
  );

  console.log(favoritesList);

  return (
    <>
      <Header />
      <div className="main-section-favorites">
        <div className="container">
          <h1>YOUR FAVORITES</h1>
          <h2>Your favorites comics</h2>
          {/* {!favoritesList ? <span>Your favorite list is empty.</span> :  */}
          <div>
            {favoriteComics.map((favoriteComic, index) => {
              return (
                <div className="favoriteComics" key={index}>
                  <img
                    src={`${favoriteComic.thumbnail.path}/standard_xlarge.${favoriteComic.thumbnail.extension}`}
                    alt="marvel-character"
                  />
                  <div>{favoriteComic.title}</div>
                </div>
              );
            })}
          </div>
          <h2>Your favorites characters</h2>
          <div>
            {favoriteCharacters.map((favoriteCharacter, index) => {
              return (
                <div className="favoriteCharacters" key={index}>
                  <img
                    src={`${favoriteCharacter.thumbnail.path}/standard_xlarge.${favoriteCharacter.thumbnail.extension}`}
                    alt="marvel-character"
                  />
                  <div>{favoriteCharacter.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;
