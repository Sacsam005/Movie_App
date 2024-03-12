import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ items }) => {
  const navigate = useNavigate();

  // navigate to detail page upon clicking card item
  const handleCardClick = (mediaType, id) => {
    navigate(`/${mediaType}/${id}`);
  };

  return (
    <>
      {items &&
        items.map((item, index) => (
          <div
            key={item?.id || index}
            className="movie_card standard__card_bg standard__box_shadow"
            title={item.original_name || item.original_title}
            onClick={() => handleCardClick(item?.media_type, item?.id)}
          >
            <span className="standard__badge badge">HD</span>
            <div className="card_img">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w1280${item.poster_path}`
                    : "https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/c6/81/92/c6819287-9f6b-737c-8da9-cd67d0b211c7/App_Icon_-_Small-marketing.lsr/1200x630bb.png"
                }
                alt={item.original_name || item.original_title}
              />
            </div>

            <div className="movie_details p-2">
              <h6>
                {(item.original_name && item.original_name.length > 16
                  ? `${item.original_name.substring(0, 16)}...`
                  : item.original_name) ||
                  (item.original_title && item.original_title.length > 16
                    ? `${item.original_title.substring(0, 16)}...`
                    : item.original_title)}
              </h6>

              <div className="movie_description d-flex justify-content-between align-items-center">
                <p className="mb-0">
                  {item.first_air_date || item.release_date
                    ? (item.first_air_date &&
                        item.first_air_date.split("-")[0]) ||
                      (item.release_date && item.release_date.split("-")[0])
                    : "N/A"}
                </p>
                <p className="mb-0">
                  {item.original_language
                    ? item.original_language.toUpperCase()
                    : "N/A"}
                </p>
                <p className="mb-0 bg-warning px-2 py-0 rounded-3">
                  {item.media_type ? item.media_type.toUpperCase() : "N/A"}
                </p>
              </div>

              <div className="imdb_ratings d-flex justify-content-between align-items-center mt-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1150px-IMDB_Logo_2016.svg.png"
                  alt="IMDB"
                  width="30px"
                />

                <p className="mb-0">
                  {item.vote_average && item.vote_count ? (
                    <>
                      <i
                        className="fa fa-star mx-1"
                        aria-hidden="true"
                        style={{ color: "#FFC107" }}
                      ></i>
                      <span className="not_badge">
                        {item.vote_average.toFixed(1)}
                      </span>
                      <span className="not_badge">({item.vote_count})</span>
                    </>
                  ) : (
                    <span className="not_badge">N/A</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Card;
