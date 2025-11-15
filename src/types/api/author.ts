/**
 * Response payload returned from the `/author` endpoint.
 */
export type AuthorApiResponse = {
    /** Biographical information describing the author. */
    info: string;
};

/**
 * Query parameters accepted when requesting author information.
 */
export type AuthorApiQueryParameters = {
    /** Unique identifier of the author. */
    id: number;
    /** Requested API version. */
    ver: number;
};
