import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../../App";
import {
  renderTrimmedText,
  toggleExpandTrimmedText,
} from "../Reusable/Reusable";

const TvDetail = ({ tv }) => {
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
              tv.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${tv.backdrop_path}`
                : "https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/c6/81/92/c6819287-9f6b-737c-8da9-cd67d0b211c7/App_Icon_-_Small-marketing.lsr/1200x630bb.png"
            }
            alt={tv.original_title || tv.original_name}
          />
        </div>

        <div className="item_details__container standard__border_radius standard__box_shadow">
          <div className="item_details__div">
            <div className="item_details__img p-1">
              <img
                className="standard__border_radius"
                src={
                  tv?.poster_path
                    ? `https://image.tmdb.org/t/p/w1280${tv?.poster_path}`
                    : "https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/c6/81/92/c6819287-9f6b-737c-8da9-cd67d0b211c7/App_Icon_-_Small-marketing.lsr/1200x630bb.png"
                }
                alt={tv.original_title || tv.original_name}
              />
            </div>

            <div className="item_details__text p-1">
              <h1 className="m-2">{tv.original_title || tv.original_name}</h1>

              <Link to={tv.homepage} className="m-2 text-decoration-underline">
                Go to Home Page
              </Link>

              <p className="m-2">
                Ratings:{" "}
                {tv.vote_average && tv.vote_count ? (
                  <>
                    <i
                      className="fa fa-star mx-1"
                      aria-hidden="true"
                      style={{ color: "#FFC107" }}
                    ></i>
                    <span className="not_badge">
                      {tv.vote_average.toFixed(1)}
                    </span>
                    <span className="not_badge">({tv.vote_count})</span>
                  </>
                ) : (
                  <span className="not_badge">N/A</span>
                )}
              </p>
              <p className="m-2">
                Last episode runtime:{" "}
                <span className="not_badge">
                  {" "}
                  {tv?.last_episode_to_air?.runtime
                    ? `${tv?.last_episode_to_air?.runtime} mins`
                    : "Not Provided"}
                </span>
              </p>
              <p className="m-2">
                Language:{" "}
                <span className="not_badge">
                  {tv?.original_language
                    ? tv?.original_language.toUpperCase()
                    : "Not Provided"}
                </span>
              </p>
              <p className="m-2">
                Origin Country:{" "}
                <span className="not_badge">
                  {tv?.origin_country || "Not provided"}
                </span>
              </p>
              <p className="m-2">
                Production
                {tv.production_countries.length > 1
                  ? " Countries: "
                  : " Country: "}
                {tv.production_countries.map((country, index) => (
                  <span key={index} className="not_badge">
                    {index > 0 && ", "} {country.name}
                  </span>
                ))}
              </p>
              <p className="m-2">
                Tagline:{" "}
                <span className="not_badge">
                  {tv?.tagline || "Not Provided"}
                </span>
              </p>
              <p
                className="m-2"
                style={{ fontSize: "18px", fontWeight: "400" }}
              >
                {renderTrimmedText(tv.overview, 200, isExpandedOverview)}

                {toggleExpandTrimmedText(
                  tv.overview,
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
                  {(tv.first_air_date && tv.first_air_date.split("-")[0]) ||
                    (tv.release_date && tv.release_date.split("-")[0])}
                  {!tv.first_air_date && !tv.release_date && "Not Provided"}
                </span>
              </p>
              <p className="mb-0">
                Total Episodes:{" "}
                <span className="not_badge">
                  {tv?.number_of_episodes || "Not Provided"}
                </span>
              </p>
              <p className="mb-0">
                Type: <span className="not_badge">{tv.type}</span>
              </p>
              <p className="mb-0">
                Total Seasons:{" "}
                <span className="not_badge">
                  {tv?.number_of_seasons || "Not Provided"}
                </span>
              </p>
              <p className="mb-0">
                Genres:{" "}
                {tv.genres && tv.genres.length > 0 ? (
                  tv.genres.map((genre, index) => (
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
                {tv.production_companies &&
                tv.production_companies.length > 0 ? (
                  tv.production_companies.map((company, index) => (
                    <span key={index} className="not_badge">
                      {" "}
                      {index > 0 && ", "}
                      {company.name}
                    </span>
                  ))
                ) : (
                  <span className="not_badge">Not Provided</span>
                )}
              </p>
              <p className="mb-0 mt-2">
                Networks:{" "}
                {tv.networks && tv.networks.length > 0 ? (
                  tv.networks.map((network, index) => (
                    <span className="not_badge mx-1" key={index}>
                      <img
                        src={
                          network.logo_path
                            ? `https://image.tmdb.org/t/p/w1280${network.logo_path}`
                            : "https://cdn-icons-png.flaticon.com/128/10609/10609073.png"
                        }
                        alt={tv.original_name || tv.original_title}
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

export default TvDetail;
