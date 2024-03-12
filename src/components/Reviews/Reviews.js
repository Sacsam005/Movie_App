import React, { useState } from "react";

const Reviews = ({ items }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const reviewsPerGroup = 5;
  const [displayedReviews, setDisplayedReviews] = useState(reviewsPerGroup);
  const [expandedReviews, setExpandedReviews] = useState({});

  const showMoreReviews = () => {
    setDisplayedReviews((prev) => prev + reviewsPerGroup);
  };

  const displayFullReview = (reviewId) => {
    setExpandedReviews((prevExpandedReviews) => ({
      ...prevExpandedReviews,
      [reviewId]: !prevExpandedReviews[reviewId],
    }));
  };

  // display expandable review text
  function renderTrimmedReview(review, maxLength, reviewId) {
    const isExpanded = expandedReviews[reviewId];

    if (isExpanded || review.length <= maxLength) {
      return review;
    } else {
      return review.slice(0, maxLength);
    }
  }

  const renderTrimmedDate = (date) => {
    // sample date: "2023-11-11T09:46:05.135Z"
    const year = date.split("-")[0];
    const month = parseInt(date.split("-")[1] - 1, 10);
    // taking only 2 digits from the third split
    const day =
      date.split("-")[2].split("")[0] + date.split("-")[2].split("")[1];

    const hour = parseInt(date.split("-")[2].match(/\d{2}:/));
    const updatedHour = hour > 12 ? hour - 12 : hour;
    const mins = date.split("-")[2].match(/:\d{2}/);
    const amPm = hour > 12 ? "PM" : "AM";

    return `${year}-${months[month]}-${day} | ${updatedHour}${mins} ${amPm}`;
  };

  if (!items || items.length === 0) {
    return <h2 className="text-center m-2 p-2">No reviews found</h2>;
  }

  return (
    <div className="reviews_container__wrapper m-2 p-2">
      <h2 className="p-2">Reviews ({items.length})</h2>

      {items.slice(0, displayedReviews).map((review) => (
        <div
          className="review_container standard__border_radius standard__box_shadow standard__bg m-3 p-3"
          key={review.id}
        >
          <div className="reviewer_profile_content d-flex justify-content-start align-items-center">
            <img
              className="rounded-50"
              src={
                review.author_details.avatar_path !== null
                  ? `https://image.tmdb.org/t/p/w1280${review.author_details?.avatar_path}`
                  : "https://assets.dryicons.com/uploads/icon/svg/9872/ab3c0a16-6f14-4817-a30b-443273de911d.svg"
              }
              alt={review.author || review.author_details.name}
              width="60px"
              style={{ objectFit: "contain" }}
            />

            <h6 className="mb-0 mx-2 d-flex flex-column">
              {review.author || review.author_details.name}

              <span
                className="not_badge d-block bg-dark text-light rounded-3 px-2"
                style={{ width: "fit-content" }}
              >
                <i
                  className="fa fa-star text-warning mx-1"
                  aria-hidden="true"
                ></i>
                {review.author_details.rating
                  ? `${review.author_details.rating}/10`
                  : "N/A"}{" "}
              </span>
            </h6>
          </div>

          <span className="not_badge text-success">
            Created at: {renderTrimmedDate(review.created_at)}
          </span>

          <div className="review_content">
            {renderTrimmedReview(review.content, 300, review.id)}

            {review.content && review.content.length > 300 && (
              <span
                className={`not_badge ${
                  expandedReviews[review.id] ? "text-danger" : "text-primary"
                }`}
                onClick={() => displayFullReview(review.id)}
                type="button"
              >
                {expandedReviews[review.id] ? "- Read less" : "...Read more"}
              </span>
            )}
          </div>
        </div>
      ))}

      {items.length > displayedReviews && (
        <button
          className="standard__border_radius standard__box_shadow mt-4 mx-auto px-3 py-2 d-grid bg-warning border-0"
          onClick={showMoreReviews}
        >
          Show more reviews
        </button>
      )}
    </div>
  );
};

export default Reviews;
