/**
 * Raw search hit returned by the `/search` endpoint.
 */
export type SearchResult = {
    /** Identifier of the matched author. */
    author_id: number;
    /** Identifier of the matched book. */
    book_id: number;
    /** Category identifier for the match. */
    cat_id: number;
    /** JSON string containing metadata for the match. */
    meta: string;
    /** Snippet of the matched content. */
    snip: string;
    /** Raw text of the matched content. */
    text: string;
};

/**
 * API response envelope for search requests.
 */
export type SearchApiResponse = {
    /** Total number of matches. */
    count: number;
    /** Individual search hits. */
    data: SearchResult[];
};

/**
 * Query parameters accepted by the `/search` endpoint.
 */
export type SearchApiQueryParameters = {
    /** Filter by author identifier. */
    author?: number;
    /** Filter by book identifier. */
    book?: number;
    /** Filter by category identifier. */
    cat_id?: number;
    /** Pagination page to request. */
    page?: number;
    /** Controls match precision. */
    precision?: number;
    /** Search term provided by the user. */
    q: string;
    /** Sorting strategy for the results. */
    sort?: string;
    /** API version to request. */
    ver: number;
};
