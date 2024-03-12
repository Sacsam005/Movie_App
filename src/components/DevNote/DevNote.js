import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DevNote = () => {
  const [isNoteOpen, setNoteOpen] = useState(false);

  useState(() => {
    setNoteOpen(true);
  }, []);

  function closeDevNote() {
    setNoteOpen(false);
  }

  return (
    <>
      <DevNoteDiv
        className="dev_note bg-warning p-2"
        style={{ display: isNoteOpen ? "block" : "none" }}
      >
        <span onClick={closeDevNote}>X</span>
        <p className="text-center mb-0 p-1">
          This movie app is fueled by the free API provided by The Movie
          Database, aka TMDB. Your fellow{" "}
          <Link
            to="https://www.linkedin.com/in/sachin-samal005/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-decoration-underline"
          >
            developer😎.
          </Link>
        </p>
      </DevNoteDiv>
    </>
  );
};

const DevNoteDiv = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;

  span {
    float: right;
    color: red;
    font-weight: 700;
  }
`;

export default DevNote;
