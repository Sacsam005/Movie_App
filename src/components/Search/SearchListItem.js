import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchListItem = forwardRef(({ items }, ref) => {
  const navigate = useNavigate();

  // navigate to either movie or tv detail page upon clicking search result
  const handleSearchResultClick = (mediaType, id) => {
    if (mediaType === "person") {
      // mediaType for person is filtered but just in case apple becomes a banana on a bad day...
      navigate("/pageNotFound");
    } else {
      navigate(`/search/${mediaType}/${id}`);
    }
  };

  return (
    <>
      {items &&
        items.map((item, index) => (
          <li
            key={item?.id || index}
            className="standard__border_radius standard__card_bg d-flex justify-content-start align-items-center p-2"
            ref={ref}
            onClick={() => handleSearchResultClick(item.media_type, item.id)}
          >
            <div className="search_list__img_div">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w1280${item.poster_path}`
                    : "https://files.readme.io/29c6fee-blue_short.svg"
                }
                style={{ objectFit: !item.poster_path ? "contain" : "cover" }}
                alt={item.original_name || item.original_title}
              />
            </div>

            <div className="search_list__details d-flex flex-column mx-2">
              <div className="search_item_title">
                <p className="mb-0">
                  {item.original_name || item.original_title}
                </p>
              </div>

              <div className="search_item_description">
                <p className="mb-0">
                  {(item.first_air_date && item.first_air_date.split("-")[0]) ||
                    (item.release_date && item.release_date.split("-")[0])}
                </p>

                <p className="mb-0">
                  {item.original_language
                    ? item.original_language.toUpperCase()
                    : "Not Provided"}
                </p>
              </div>
            </div>
          </li>
        ))}
    </>
  );
});

export default SearchListItem;
