import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  fetchAndSetDataForPagination,
  dynamicDocTitle,
} from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Header from "../../layout/Header/Header";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import Pagination from "../../components/Pagination/Pagination";
import Card from "../../components/Cards/Card";
import Footer from "../../layout/Footer/Footer";

const GenreList = () => {
  const navigate = useNavigate();
  const { id, genre, mediaType } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page");
  const pageNum = parseInt(page);

  const [currentPage, setCurrentPage] = useState(pageNum || 1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  // dynamic title for movies and tvs genre page
  useEffect(() => {
    dynamicDocTitle(
      `TMDB - Explore ${genre.toLowerCase()} ${
        mediaType === "movie" ? "movies" : "tv shows"
      } in TMDB`
    );

    window.scrollTo(0, 0);
  }, [genre, mediaType]);

  useEffect(() => {
    // get and set movie, tv shows based on genre id with pagination
    fetchAndSetDataForPagination(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${id}&page=${currentPage}`,
      setItems,
      (totalPages) => {
        setTotalPages(Math.min(totalPages, 500));
      },
      navigate
    );

    window.scrollTo(0, 0);
  }, [mediaType, id, genre, totalPages, currentPage, navigate]);

  // update the displayed current page number
  useEffect(() => {
    setCurrentPage(pageNum || 1);
  }, [pageNum]);

  const handlePageNumClick = (page) => {
    setCurrentPage(page);
    navigate(`/genre/${mediaType}/${genre}/${id}?page=${page}`);
  };

  if (!items) {
    return <Loader cardCount={16} width={"180px"} />;
  }

  return (
    <>
      {items && items.length > 0 && (
        <>
          <Header />

          <Jumbotron
            text={`${
              mediaType === "movie" ? "Movies" : "TV Shows"
            } in '${genre}' Genre`}
          />

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

          <div className="items_container__wrapper mt-2 mx-auto p-3">
            {mediaType === "movie"
              ? items.map((item) => (
                  <Card
                    items={[{ ...item, media_type: "movie" }]}
                    key={item.id}
                  />
                ))
              : items.map((item) => (
                  <Card items={[{ ...item, media_type: "tv" }]} key={item.id} />
                ))}
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

          <Footer />
        </>
      )}
    </>
  );
};

export default GenreList;
