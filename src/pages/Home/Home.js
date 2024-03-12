import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { dynamicDocTitle } from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Header from "../../layout/Header/Header";
import Search from "../../components/Search/Search";
import Hero from "../../layout/Hero/Hero";
import Footer from "../../layout/Footer/Footer";

const Home = () => {
  const { isLoading } = useContext(AppContext);

  // dynamic title for home page
  useEffect(() => {
    dynamicDocTitle(
      `TMDB - Millions of movies, Tv shows and people to discover. Explore now.`
    );
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loader cardCount={16} width="180px" />;
  }

  return (
    <>
      <Header />
      <Search />
      <Hero />
      <Footer />
    </>
  );
};

export default Home;
