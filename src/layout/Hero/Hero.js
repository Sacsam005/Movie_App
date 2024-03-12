import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { fetchAndSetData } from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Card from "../../components/Cards/Card";

import "../../index.css";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeList, setActiveList] = useState([]);
  const categories = ["all", "tv", "movie"];
  const titleRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetchAndSetData(
      `https://api.themoviedb.org/3/trending/${activeCategory}/day`,
      setActiveList,
      navigate,
      "results"
    );
    setIsLoading(false);
  }, [activeCategory, setIsLoading, navigate]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  if (isLoading) {
    return <Loader cardCount={16} width="180px" />;
  }

  return (
    <>
      {!isLoading && (
        <>
          <hr />

          <h6 style={{ margin: "1.2rem" }} ref={titleRef}>
            {categories.map((category) => (
              <span
                key={category}
                className={`mx-1 ${
                  activeCategory === category ? "standard__badge" : ""
                }`}
                style={{
                  background: "transparent",
                }}
                title={category}
                onClick={() => handleCategoryClick(category)}
              >
                {category === "all"
                  ? "Trending"
                  : category === "tv"
                  ? "TV Shows"
                  : "Movies"}
              </span>
            ))}
          </h6>

          <div className="items_container__wrapper mt-2 mx-auto p-2">
            <Card items={activeList} />
          </div>
        </>
      )}
    </>
  );
};

export default Hero;
