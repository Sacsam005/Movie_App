import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAndSetData } from "../Reusable/Reusable";

import Jumbotron from "../Jumbotron/Jumbotron";
import SearchListItem from "./SearchListItem";

import "../../index.css";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const listRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [imageIndex, setImgIndex] = useState(0);

  // get images from an array of top 20 movies
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${process.env.REACT_APP_AUTHORIZATION_KEY}`,
      },
    };

    async function getImages() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day",
          options
        );
        const data = await response.json();

        setImages(
          data.results.map(
            (result) =>
              `https://image.tmdb.org/t/p/w1280${result?.backdrop_path}` ||
              `https://image.tmdb.org/t/p/w1280${result?.poster_path}`
          )
        );
        setImagesLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
    getImages();
  }, []);

  // poster image slideshow
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => {
      clearInterval(sliderInterval);
    };
    // eslint-disable-next-line
  }, [images]);

  useEffect(() => {
    // get and set search results...
    fetchAndSetData(
      `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&api_key=${process.env.REACT_APP_API_KEY}`,
      (searchResults) => {
        setSearchResults(
          searchResults.filter((result) => result?.media_type !== "person")
        );
      },
      navigate,
      "results"
    );
  }, [searchTerm, navigate]);

  // navigate to search results page when result item is clicked...
  const handleSearchResultClick = () => {
    const queryParam = encodeURIComponent(searchTerm);
    navigate(`/search/results?q=${queryParam}`);
  };

  if (!images || imagesLoading) {
    return (
      <h6
        className="p-2 text-center"
        style={{ marginTop: "4rem", color: "#f953c6" }}
      >
        Loading...
      </h6>
    );
  }

  return (
    <>
      <div className="img__overlay_container default__margin_top">
        <img
          src={images[imageIndex]}
          alt="TMDB Poster"
          className={`slideshow ${
            imageIndex % 2 === 0 ? "effect1" : "effect2"
          }`}
        />
      </div>

      <div className="search_container__wrapper">
        <div className="search_content__wrapper">
          <div className="search_bar standard__border_radius standard__box_shadow d-flex justify-content-center align-items-center flex-column">
            <Jumbotron text="Find Movies, TV shows and more" marginTop="0" />

            <input
              type="text"
              placeholder="Search for movies and tv shows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* get search list if search term includes the existing content */}
        <ol className="standard__border_radius standard__bg standard__box_shadow d-flex justify-content-center align-items-center flex-column mx-auto p-0">
          {searchResults && searchResults.length >= 3 ? (
            searchResults
              .slice(0, 3)
              .map((item, index) => (
                <SearchListItem key={index} ref={listRef} items={[item]} />
              ))
          ) : searchTerm !== "" &&
            searchResults.map((item, index) => (
              <SearchListItem key={index} ref={listRef} items={[item]} />
            )) ? (
            <h6 style={{ padding: "2rem", width: "90%", textAlign: "center" }}>
              No match found for "{searchTerm}"
            </h6>
          ) : null}

          {searchResults && searchResults.length > 3 && (
            <button
              className="view_all_btn border-0 p-3 w-100 bg-warning"
              onClick={handleSearchResultClick}
            >
              View all results
              <i className="fa fa-arrow-right mx-2" aria-hidden="true"></i>
            </button>
          )}
        </ol>
      </div>
    </>
  );
};

export default Search;
