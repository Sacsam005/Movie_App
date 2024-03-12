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

const TV = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page");
  const pageNum = parseInt(page);

  const [tvShows, setTvShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageNum || 1);
  const [totalPages, setTotalPages] = useState(null);

  // dynamic title for tv page
  useEffect(() => {
    dynamicDocTitle("TMDB - Millions of Tv shows to discover. Explore now.");
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // get and set tv data for pagination
    fetchAndSetDataForPagination(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`,
      setTvShows,
      (totalPages) => {
        setTotalPages(Math.min(totalPages, 500));
      },
      navigate
    );

    window.scrollTo(0, 0);
  }, [currentPage, navigate]);

  // navigate to the first page when clicked on TV Shows from header
  const handleTvShowsClick = () => {
    setCurrentPage(1);
    navigate(`/tv?page=1`);
  };

  const handlePageNumClick = (page) => {
    setCurrentPage(page);
    navigate(`/tv_shows?page=${page}`);
  };

  if (!tvShows) {
    return <Loader cardCount={16} width="180px" />;
  }

  return (
    <>
      {tvShows && tvShows.length > 0 && (
        <>
          <Header handlePageClick={handleTvShowsClick} />

          <Jumbotron text="Millions of Tv shows to discover. Explore now." />

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
              items={tvShows}
              setSortedItems={setTvShows}
              mediaType="tv shows"
              currentPage={currentPage}
            />

            <div className="items_container__wrapper mt-2 mx-auto p-3">
              {/* only show sorted tvShows if sort option is clicked */}
              <Card items={tvShows} />
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

export default TV;
