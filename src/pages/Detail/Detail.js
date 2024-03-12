import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import {
  fetchAndSetData,
  dynamicDocTitle,
} from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Header from "../../layout/Header/Header";
import MovieDetail from "../../components/ItemDetail/MovieDetail";
import TvDetail from "../../components/ItemDetail/TvDetail";
import Footer from "../../layout/Footer/Footer";
import Person from "../../components/Cards/Person";
import Video from "../../components/Videos/Video";
import Reviews from "../../components/Reviews/Reviews";

import "./Detail.css";

const Detail = () => {
  const navigate = useNavigate();
  const { isLoading } = useContext(AppContext);
  const { id, mediaType } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [trailerVideos, setTrailerVideos] = useState([]);
  const [people, setPeople] = useState([]);
  const [reviews, setReviews] = useState([]);

  // dynamic title for item's detail page
  useEffect(() => {
    dynamicDocTitle(
      `TMDB - ${`More about "${
        itemDetails?.original_name || itemDetails?.original_title
      }"`}`
    );
    window.scrollTo(0, 0);
  }, [itemDetails]);

  useEffect(() => {
    // get and set item's detail
    fetchAndSetData(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}`,
      setItemDetails,
      navigate
    );

    // get and set video url
    fetchAndSetData(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`,
      setTrailerVideos,
      navigate,
      "results"
    );

    // get and set people
    fetchAndSetData(
      `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`,
      setPeople,
      navigate,
      "cast"
    );

    // get and set reviews
    fetchAndSetData(
      `https://api.themoviedb.org/3/${mediaType}/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`,
      setReviews,
      navigate,
      "results"
    );
  }, [id, mediaType, navigate]);

  if (isLoading || !itemDetails || !trailerVideos || !people || !reviews) {
    return <Loader cardCount={1} width={"600px"} />;
  }

  return (
    <>
      {itemDetails && trailerVideos && people && reviews && (
        <>
          <Header />

          {mediaType === "movie" ? (
            // if mediaType is "movie"
            <MovieDetail movie={itemDetails} />
          ) : (
            // if mediaType is "tv"
            <TvDetail tv={itemDetails} />
          )}

          <hr />

          <Person people={people} />

          <hr />

          <Video videos={trailerVideos} />

          <hr />

          <Reviews items={reviews} />

          <Footer />
        </>
      )}
    </>
  );
};

export default Detail;
