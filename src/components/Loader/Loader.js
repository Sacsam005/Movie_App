import React from "react";
import "./Loader.css";

const Loader = ({ cardCount, width }) => {
  const renderCards = () => {
    const cards = [];
    for (let i = 0; i < cardCount; i++) {
      cards.push(
        <div
          className="loader standard__border_radius m-3 d-flex flex-column overflow-hidden"
          key={i}
          style={{ width: width }}
        >
          <div className="loader_img skeleton"></div>
          <div className="loader_body">
            <h2
              className="loader_title skeleton visually_hidden"
              style={{ opacity: 0 }}
            >
              Loading...
            </h2>
            <p className="loader_intro skeleton"></p>
          </div>
        </div>
      );
    }
    return cards;
  };

  return (
    <div className="loader__wrapper">
      <div className="loader__container">{renderCards()}</div>
    </div>
  );
};

export default Loader;
