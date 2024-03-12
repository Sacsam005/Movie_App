import React from "react";
import { Link } from "react-router-dom";
import DevNote from "../../components/DevNote/DevNote";

const Footer = () => {
  return (
    <>
      <footer className="standard__bg p-2 mt-2 text-center">
        <Link
          to="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-decoration-underline"
          style={{
            fontSize: "2rem",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
          }}
        >
          A BIG SHOUTOUT TO TMDB FOR THEIR FREE API !!!
        </Link>

        <p className="mb-1">
          The Movie Database (TMDB) is a community built movie and TV database.
          Every piece of data has been added by our amazing community dating
          back to 2008. TMDB's strong international focus and breadth of data is
          largely unmatched and something we're incredibly proud of. Put simply,
          we live and breathe community and that's precisely what makes us
          different.
        </p>
        <Link
          to="https://developer.themoviedb.org/reference/intro/getting-started"
          className="text-decoration-underline"
        >
          For more info on their API
        </Link>
      </footer>
      <DevNote />
    </>
  );
};

export default Footer;
