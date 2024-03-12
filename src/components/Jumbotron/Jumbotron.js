import React from "react";

const Jumbotron = ({ text, marginTop = "3rem" }) => {
  return (
    <>
      <div
        className="jumbotron p-3 d-flex justify-content-center flex-column"
        style={{ marginTop: `${marginTop}` }}
      >
        <h1
          className="display-4 text-center jumbotron"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {text}
        </h1>
      </div>
    </>
  );
};

export default Jumbotron;
