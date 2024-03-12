import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../../App";
import {
  renderTrimmedText,
  toggleExpandTrimmedText,
} from "../Reusable/Reusable";

const MovieDetail = ({ movie }) => {
  const { scaleVariants } = useContext(AppContext);
  const [isExpandedOverview, setExpandedOverview] = useState(false);

  const toggleExpandOverview = () => {
    setExpandedOverview(!isExpandedOverview);
  };

  return (
    <>
      <motion.div
        className="item_details__wrapper default__margin_top flex-column p-3"
        initial="hidden"
        animate="visible"
        variants={scaleVariants}
      >
        <div className="img__overlay_container">
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                : "https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/c6/81/92/c6819287-9f6b-737c-8da9-cd67d0b211c7/App_Icon_-_Small-marketing.lsr/1200x630bb.png"
            }
            alt={movie.original_title || movie.original_name}
          />
        </div>

        <div className="item_details__container standard__border_radius standard__box_shadow">
          <div className="item_details__div">
            <div className="item_details__img p-1">
              <img
                className="standard__border_radius"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                    : "https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/c6/81/92/c6819287-9f6b-737c-8da9-cd67d0b211c7/App_Icon_-_Small-marketing.lsr/1200x630bb.png"
                }
                alt={movie.original_title || movie.original_name}
              />
            </div>

            <div className="item_details__text p-1">
              <h1 className="m-2">
                {movie.original_title || movie.original_name}
              </h1>

              <Link
                to={movie.homepage}
                className="m-2 text-decoration-underline"
              >
                Go to Home Page
              </Link>

              <p className="m-2">
                Ratings:{" "}
                {movie.vote_average && movie.vote_count ? (
                  <>
                    <i
                      className="fa fa-star mx-1"
                      aria-hidden="true"
                      style={{ color: "#FFC107" }}
                    ></i>
                    <span className="not_badge">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="not_badge">({movie.vote_count})</span>
                  </>
                ) : (
                  <span className="not_badge">N/A</span>
                )}
              </p>
              <p className="m-2">
                Duration:{" "}
                <span className="not_badge">
                  {movie.runtime ? `${movie?.runtime} mins` : "Not Provided"}
                </span>
              </p>
              <p className="m-2">
                Language:{" "}
                <span className="not_badge">
                  {movie.original_language
                    ? movie.original_language.toUpperCase()
                    : "Not Provided"}
                </span>
              </p>
              <p className="m-2">
                Production
                {movie.production_countries.length > 1
                  ? " Countries: "
                  : " Country: "}
                {movie.production_countries.map((country, index) => (
                  <span key={index} className="not_badge">
                    {index > 0 && ", "} {country.name}
                  </span>
                ))}
              </p>
              <p className="m-2">
                Tagline:{" "}
                <span className="not_badge">
                  {movie?.tagline || "Not Provided"}
                </span>
              </p>
              <p
                className="m-2"
                style={{ fontSize: "18px", fontWeight: "normal" }}
              >
                {renderTrimmedText(movie.overview, 200, isExpandedOverview)}

                {toggleExpandTrimmedText(
                  movie.overview,
                  200,
                  isExpandedOverview,
                  toggleExpandOverview
                )}
              </p>
            </div>
          </div>

          <hr style={{ border: "1px solid #888", width: "90%" }} />

          <div className="item_details__extra_info w-100 p-2">
            <div className="item_details_list_one">
              <p className="mb-0">
                Released Date:{" "}
                <span className="not_badge">
                  {(movie.first_air_date &&
                    movie.first_air_date.split("-")[0]) ||
                    (movie.release_date && movie.release_date.split("-")[0])}
                  {!movie.first_air_date &&
                    !movie.release_date &&
                    "Not Provided"}
                </span>
              </p>
              <p className="mb-0">
                Genres:{" "}
                {movie.genres && movie.genres.length > 0 ? (
                  movie.genres.map((genre, index) => (
                    <span key={index}>{genre.name}</span>
                  ))
                ) : (
                  <span className="not_badge">Not Provided</span>
                )}
              </p>
            </div>

            <div className="item_details_list_two">
              <p className="mb-0">
                Production:{" "}
                {movie.production_companies &&
                movie.production_companies.length > 0 ? (
                  movie.production_companies.map((company, index) => (
                    <span key={index} className="not_badge">
                      {index > 0 && ", "} {company.name}
                    </span>
                  ))
                ) : (
                  <span className="not_badge">Not Provided</span>
                )}
              </p>
              <p className="mb-0">
                Networks:{" "}
                {movie.production_companies &&
                movie.production_companies.length > 0 ? (
                  movie.production_companies.map((company, index) => (
                    <span className="not_badge mx-1" key={index}>
                      <img
                        src={
                          company.logo_path !== null
                            ? `https://image.tmdb.org/t/p/w1280${company?.logo_path}`
                            : "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                        }
                        alt={movie.original_name || movie.original_title}
                        width="100px"
                      />
                    </span>
                  ))
                ) : (
                  <span className="not_badge">Not Provided</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MovieDetail;
