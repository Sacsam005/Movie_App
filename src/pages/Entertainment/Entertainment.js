import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  fetchAndSetData,
  dynamicDocTitle,
} from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import Header from "../../layout/Header/Header";
import Card from "../../components/Cards/Card";
import Footer from "../../layout/Footer/Footer";

const Entertainment = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const { pathname } = useLocation();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  // dynamic title for entertainment page
  useEffect(() => {
    dynamicDocTitle(
      `TMDB - ${
        title === "on_the_air"
          ? "On the air"
          : title === "top_rated"
          ? "Top rated"
          : "Popular"
      } tv shows and movies to discover. Explore now.`
    );

    window.scrollTo(0, 0);
  }, [title, pathname]);

  useEffect(() => {
    // get and set now playing, popular and top rated tv shows...
    fetchAndSetData(
      `https://api.themoviedb.org/3/tv/${title}?api_key=${process.env.REACT_APP_API_KEY}`,
      setTvShows,
      navigate,
      "results"
    );

    // get and set now playing, popular and top rated movies...
    fetchAndSetData(
      `https://api.themoviedb.org/3/movie/${
        title === "on_the_air" ? "now_playing" : title
      }?api_key=${process.env.REACT_APP_API_KEY}`,
      setMovies,
      navigate,
      "results"
    );
  }, [title, navigate]);

  if (!tvShows || !movies) {
    return <Loader cardCount={16} width="180px" />;
  }

  return (
    <>
      {tvShows && movies && (
        <>
          <Header />

          {/* displaying tv shows */}
          <Jumbotron
            text={`${
              title === "on_the_air"
                ? "On the Air"
                : title === "top_rated"
                ? "Top Rated"
                : "Popular"
            } TV Shows`}
          />

          <div className="items_container__wrapper mt-2 mx-auto p-3">
            {tvShows.map((tv) => (
              <Card items={[{ ...tv, media_type: "tv" }]} key={tv.id} />
            ))}
          </div>

          <hr
            style={{
              width: "90%",
              color: "#e2e2e2",
              height: "3px",
              margin: "1rem auto",
            }}
          />

          {/* displaying movies */}
          <Jumbotron
            text={`${
              title === "on_the_air"
                ? "On the Air"
                : title === "top_rated"
                ? "Top Rated"
                : "Popular"
            } Movies`}
          />

          <div className="items_container__wrapper mt-2 mx-auto p-3">
            {movies.map((movie) => (
              <Card
                items={[{ ...movie, media_type: "movie" }]}
                key={movie.id}
              />
            ))}
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default Entertainment;
