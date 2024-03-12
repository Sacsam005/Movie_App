#### User stories

##### Search Functionality:

- Search should work (MVP).
- Trim search results if the length exceeds 3-5, appending and displaying a "View all results" button.
- Clicking the "View all results" button should navigate to the Results page transporting the search results.
- Ensure search functionality works seamlessly from the URL. If a user enters a keyword in the URL as a search query, it should return relevant results.
- EXCLUDE results that involve a person, only including Movie and TV media types.

##### Search from URL improvements:

- If the query is empty, navigate to PageNotFound or display a warning message.
- If the query is omitted in the search URL (e.g., "/search/results" without "/search/results/q=something"), navigate to PageNotFound.
- Refine results by handling the length of the query. For instance, custom handling can be applied when a user enters a single letter as a query to avoid returning an extensive list of results.

##### Pagination

- Ensure the Movies and TV pages start with page=1 content.
- Update both page and content when the page button is clicked.
- Update page and content when the page number is modified in the URL (e.g., changing page=1 to page=5).
- If the page number exceeds total_pages, navigate to PageNotFound. This situation arises if a user attempts to update the URL with page=1000 when the total_pages value is 500.
- If the page value is absent in the URL for movies and TV, always navigate to the first page's content. For example, "/movies/" or "/tv_shows/" should lead to the first page's content, same as "/movies/page=1" or "/tv_shows/page=1".

###### NOTE:

When fetching data for movies, TV shows, and certain genres, the API response may include a total_pages value exceeding 500. However, attempting to access a page beyond 500 leads to an error. To address this limitation, the logic ensures that if total_pages surpasses 500, it is set to 500; otherwise, it retains its original value. This approach prevents errors while maintaining accurate pagination for values up to 500.
