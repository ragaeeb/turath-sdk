/**
 * Raw response returned by the `/page` endpoint.
 */
export type PageApiResponse = {
    /** JSON string containing page metadata. */
    meta: string;
    /** Page body text. */
    text: string;
};

/**
 * Query parameters accepted by the `/page` endpoint.
 */
export type PageApiQueryParameters = {
    /** Identifier of the book containing the page. */
    book_id: number;
    /** Page number to retrieve. */
    pg: number;
    /** API version to request. */
    ver: number;
};
