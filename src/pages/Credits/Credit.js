import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAndSetData,
  dynamicDocTitle,
} from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Header from "../../layout/Header/Header";
import PersonDetailCard from "../../components/Cards/PersonDetailCard";
import Card from "../../components/Cards/Card";
import Footer from "../../layout/Footer/Footer";

const Credit = () => {
  const navigate = useNavigate();
  const { person, id } = useParams();
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTvCredits] = useState([]);
  const [personDetails, setPersonDetails] = useState(null);
  const [isMovieCreditExpanded, setMovieCreditExpanded] = useState(false);
  const [isTvCreditExpanded, setTvCreditExpanded] = useState(false);

  // display fewer items initially and display all on expand
  const displayedMovieCredits = isMovieCreditExpanded
    ? movieCredits
    : movieCredits.slice(0, 12);
  const displayedTvCredits = isTvCreditExpanded
    ? tvCredits
    : tvCredits.slice(0, 12);

  const toggleMovieCreditExpand = () => {
    setMovieCreditExpanded(!isMovieCreditExpanded);
  };

  const toggleTvCreditExpand = () => {
    setTvCreditExpanded(!isTvCreditExpanded);
  };

  // dynamic title for item's credit page
  useEffect(() => {
    dynamicDocTitle(`${person} - The Movie Database`);
    window.scrollTo(0, 0);
  }, [person, id]);

  useEffect(() => {
    // get and set movie credits
    fetchAndSetData(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`,
      setMovieCredits,
      navigate,
      "cast"
    );

    // get and set tv credits
    fetchAndSetData(
      `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${process.env.REACT_APP_API_KEY}`,
      setTvCredits,
      navigate,
      "cast"
    );

    // get and set credit's detail
    fetchAndSetData(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`,
      setPersonDetails,
      navigate
    );
  }, [id, navigate]);

  useEffect(() => {
    navigate(`/credit/${personDetails?.name || "unknown"}/${id}`, {
      replace: true,
    });
  }, [personDetails, id, navigate]);

  if (!movieCredits || !tvCredits || !personDetails) {
    return <Loader cardCount={1} width={"600px"} />;
  }

  return (
    <>
      {movieCredits && tvCredits && (
        <>
          <Header />

          {personDetails && <PersonDetailCard person={personDetails} />}

          <hr />

          {/* display person's other movies */}
          {movieCredits.length > 0 ? (
            <>
              <h2 className="text-center m-2 p-2">{person}'s other movies</h2>

              <div className="items_container__wrapper mt-2 mx-auto p-3">
                {displayedMovieCredits.map((movie, index) => (
                  // using index as key for unique value
                  <Card
                    items={[{ ...movie, media_type: "movie" }]}
                    key={index}
                  />
                ))}
              </div>
            </>
          ) : (
            <h2 className="text-center mt-2 p-2">
              No movies found for '{person}'
            </h2>
          )}

          {movieCredits.length > 12 && (
            <button
              className={`standard__border_radius standard__box_shadow d-grid border-0 mx-auto px-3 py-2 ${
                isMovieCreditExpanded ? "bg-danger text-light" : "bg-warning"
              }`}
              onClick={toggleMovieCreditExpand}
            >
              {isMovieCreditExpanded ? "Show less movies" : "Show more movies"}
            </button>
          )}

          <hr />

          {/* display person's other tv shows */}
          {tvCredits.length > 0 ? (
            <>
              <h2 className="text-center m-2 p-2">{person}'s other Tv Shows</h2>
              <div className="items_container__wrapper mt-2 mx-auto p-3">
                {displayedTvCredits.map((tv) => (
                  // using id as key for unique value
                  <Card items={[{ ...tv, media_type: "tv" }]} key={tv.id} />
                ))}
              </div>
            </>
          ) : (
            <h2 className="text-center mt-2 p-2">
              No tv shows found for '{person}'
            </h2>
          )}

          {tvCredits.length > 12 && (
            <button
              className={`standard__border_radius standard__box_shadow d-grid border-0 mx-auto px-3 py-2 ${
                isTvCreditExpanded ? "bg-danger text-light" : "bg-warning"
              }`}
              onClick={toggleTvCreditExpand}
            >
              {isTvCreditExpanded ? "Show less tv shows" : "Show more tv shows"}
            </button>
          )}

          <Footer />
        </>
      )}
    </>
  );
};

export default Credit;
