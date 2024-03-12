import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found";
  });

  return (
    <>
      <ErrorDiv className="error_div p-2">
        <h6 className="text-center m-0">
          Sorry! The page you're looking for might not exist...
        </h6>
        <h1 className="text-center m-0">404</h1>
        <h6 className="text-center m-0">Page not found</h6>
        <button
          className="btn btn-primary rounded-0 mt-2"
          onClick={() => navigate("/")}
        >
          Go back to home
        </button>
      </ErrorDiv>
    </>
  );
};

const ErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;

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
  }

  h6 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #6c757d;
  }
`;

export default PageNotFound;
