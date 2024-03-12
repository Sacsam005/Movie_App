import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  fetchAndSetData,
  dynamicDocTitle,
} from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Header from "../../layout/Header/Header";
import Card from "../../components/Cards/Card";
import Sort from "../../components/Sort/Sort";
import Footer from "../../layout/Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";

const Results = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get("q");

  const [results, setResults] = useState([]);
  const [initialResultsLoaded, setInitialResultsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // dynamic title for search results page
  useEffect(() => {
    dynamicDocTitle(`TMDB - ${`Results for "${query}"`}`);
    window.scrollTo(0, 0);
  }, [query]);

  useEffect(() => {
    // get and set data from search results
    fetchAndSetData(
      `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${process.env.REACT_APP_API_KEY}`,
      (results) => {
        setResults(results.filter((result) => result?.media_type !== "person"));
        setInitialResultsLoaded(true);
      },
      navigate,
      "results"
    );
  }, [query, navigate]);

  if (!initialResultsLoaded) {
    return <Loader cardCount={16} width="180px" />;
  }

  if (!query) {
    return <PageNotFound />;
  }

  return (
    <>
      {results && (
        <>
          <Header />

          {results.length !== 0 && (
            <div
              className="items_container position-relative p-3"
              style={{ marginTop: "4rem" }}
            >
              <h2 className="text-center">
                You searched for '
                <span className="not_badge text-primary">{query}</span>'
              </h2>

              <h6 className="text-center p-2">
                Displaying all results for '
                <span className="not_badge text-primary">{query}</span>'
              </h6>

              {results.length > 5 && (
                <Sort
                  items={results}
                  setSortedItems={setResults}
                  mediaType="results"
                />
              )}

              <div className="items_container__wrapper mt-2 mx-auto p-3">
                <Card items={results} />
              </div>

              <h6 className="text-center p-2">End of results</h6>
            </div>
          )}

          {results.length === 0 && initialResultsLoaded && (
            <ErrorDiv className="text-center p-2">
              <h6>
                No results found for '
                <span className="not_badge text-primary">{query}</span>'
              </h6>
              <h6>Try refining your search or exploring popular items.</h6>
              <h1>SORRY</h1>
            </ErrorDiv>
          )}

          <Footer />
        </>
      )}
    </>
  );
};

const ErrorDiv = styled.div`
margin-top: 4rem;

  h6 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #6c757d;
  }

  h1 {
    font-size: 15rem;
    font-weight: 900;
    color: #ff4500;
    letter-spacing: 1px;
    text-shadow: 2px 2px #2d131b, 3px 3px #2d131b, 4px 4px #2d131b,
      5px 5px #2d131b, 6px 6px #2d131b, 7px 7px #2d131b, 8px 8px #2d131b,
      9px 9px #2d131b, 10px 10px #2d131b, 11px 11px #2d131b, 12px 12px #2d131b,
      13px 13px #2d131b, 14px 14px #2d131b, 15px 15px #2d131b;
    @media screen and (max-width: 1024px) {
      font-size: 8rem;
    }
    @media screen and (max-width: 500px) {
      font-size: 5rem;
    @media screen and (max-width: 360px) {
      font-size: 3rem;
  }
}`;

export default Results;
