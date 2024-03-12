// get and set data...
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `${process.env.REACT_APP_AUTHORIZATION_KEY}`,
  },
};

// fetch data and set for display
export const fetchAndSetData = async (
  url,
  setDataFunction,
  navigateFunction,
  array
) => {
  try {
    const response = await fetch(url, options);

    // if fetch status failed show error page...
    if (response.status !== 200) {
      navigateFunction("/pageNotFound");
      throw new Error("Error fetching data for this page!");
    }

    const data = await response.json();

    if (!data && data.results.length === 0) {
      navigateFunction("/pageNotFound");
    }

    if (array) {
      setDataFunction(data[array]);
    } else {
      setDataFunction(data);
    }
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

// fetch data and set for pagination
export const fetchAndSetDataForPagination = async (
  url,
  setDataFunction,
  setTotalPages,
  navigateFunction
) => {
  try {
    const response = await fetch(url);

    // if fetch status failed show error page...
    if (response.status !== 200) {
      navigateFunction("/pageNotFound");
      throw new Error("Error fetching data for this page!");
    }

    const data = await response.json();

    if (!data && data.results.length === 0) {
      navigateFunction("/pageNotFound");
    }

    setDataFunction(data.results);

    if (typeof setTotalPages === "function") {
      setTotalPages(data.total_pages);
    }
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

// changes document title of page onload...
export const dynamicDocTitle = (title) => {
  document.title = title;
};

// trim text view based on length
// applied for movie and tv show overview, person's bio...
export const renderTrimmedText = (text, maxTextLength, isTextExpanded) => {
  const preferredText = text || "Not Provided";

  if (isTextExpanded || preferredText.length <= maxTextLength) {
    return preferredText;
  } else {
    return preferredText.slice(0, maxTextLength);
  }
};

// display/not display full text on toggle
export const toggleExpandTrimmedText = (
  text,
  maxTextLength,
  isTextExpanded,
  toggleTextFunction
) => {
  if (text && text.length > maxTextLength) {
    return (
      <span
        className={`not_badge ${
          isTextExpanded ? "text-danger" : "text-primary"
        }`}
        onClick={toggleTextFunction}
        type="button"
      >
        {isTextExpanded ? "- Read less" : " ...Read more"}
      </span>
    );
  }
};
