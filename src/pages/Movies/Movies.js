import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchAndSetDataForPagination,
  dynamicDocTitle,
} from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Header from "../../layout/Header/Header";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import Card from "../../components/Cards/Card";
import Pagination from "../../components/Pagination/Pagination";
import Sort from "../../components/Sort/Sort";
import Footer from "../../layout/Footer/Footer";

const Movies = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page");
  const pageNum = parseInt(page);

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageNum || 1);
  const [totalPages, setTotalPages] = useState(null);

  // dynamic title for movies page
  useEffect(() => {
    dynamicDocTitle("TMDB - Millions of movies to discover. Explore now.");
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // get and set movie data for pagination
    fetchAndSetDataForPagination(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`,
      setMovies,
      (totalPages) => {
        setTotalPages(Math.min(totalPages, 500));
      },
      navigate
    );

    window.scrollTo(0, 0);
  }, [currentPage, navigate]);

  // navigate to the first page when clicked on Movies from header
  const handleMoviesClick = () => {
    setCurrentPage(1);
    navigate(`/movies?page=1`);
  };

  const handlePageNumClick = (page) => {
    setCurrentPage(page);
    navigate(`/movies?page=${page}`);
  };

  if (!movies) {
    return <Loader cardCount={16} width="180px" />;
  }

  return (
    <>
      {movies && movies.length > 0 && (
        <>
          <Header handlePageClick={handleMoviesClick} />

          <Jumbotron text="Millions of movies to discover. Explore now." />

          <div className="items_container position-relative">
            <h6 className="text-center m-2 p-2">
              Showing page{" "}
              <span className="not_badge text-primary">'{currentPage}'</span> of{" "}
              {totalPages}
            </h6>

            <Pagination
              handlePageNumClick={handlePageNumClick}
              totalPages={totalPages}
              currentPage={currentPage}
            />

            <Sort
              items={movies}
              setSortedItems={setMovies}
              mediaType="movies"
              currentPage={currentPage}
            />

            <div className="items_container__wrapper mt-2 mx-auto p-3">
              {/* only show sorted movies if sort option is clicked */}
              <Card items={movies} />
            </div>

            <h6 className="text-center m-2 p-2">
              Showing page{" "}
              <span className="not_badge text-primary">'{currentPage}'</span> of{" "}
              {totalPages}
            </h6>

            <Pagination
              handlePageNumClick={handlePageNumClick}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default Movies;
