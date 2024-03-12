import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import TV from "./pages/TV/TV";
import Detail from "./pages/Detail/Detail";
import Entertainment from "./pages/Entertainment/Entertainment";
import Credit from "./pages/Credits/Credit";
import Results from "./pages/Results/Results";
import GenreList from "./pages/Genre/Genre";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

export const AppContext = React.createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const scaleVariants = {
    hidden: { scale: 0.5 },
    visible: { scale: 1 },
    closed: { scale: 0, opacity: 0 },
  };

  // transport AppContext values
  const AppContextValues = {
    isLoading,
    setIsLoading,
    scaleVariants,
  };

  return (
    <>
      <AppContext.Provider value={AppContextValues}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv_shows" element={<TV />} />
          <Route path=":mediaType/:id" element={<Detail />} />
          <Route path="entertainment/:title" element={<Entertainment />} />
          <Route path="credit/:person/:id" element={<Credit />} />
          <Route path="search">
            <Route path=":mediaType/:id" element={<Detail />} />
            <Route path="results/*" element={<Results />} />
          </Route>
          <Route path="/genre/:mediaType/:genre/:id" element={<GenreList />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
