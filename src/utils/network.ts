const API_BASE_URL = 'https://api.turath.io/';
const FILES_BASE_URL = 'https://files.turath.io/books/';

/**
 * Primitive JSON value supported by the API responses.
 */
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Represents the generic JSON structure returned by the turath.io APIs.
 */
type JsonResponse = Record<string, JsonValue>;

/**
 * Supported query parameter values when issuing GET requests.
 */
type QueryValue = string | number | boolean | null | undefined;

/**
 * Query parameters accepted by {@link getJson}.
 */
type QueryParameters = Record<string, QueryValue>;

/**
 * HTTP error returned when a request fails.
 */
type HttpError = Error & {
    /** Numeric HTTP status code associated with the failure. */
    status: number;
    /** Textual HTTP status message. */
    statusText: string;
    /** Fully-qualified URL that produced the failure. */
    url: string;
};

/**
 * Creates a typed {@link HttpError} from a failed {@link Response}.
 */
const createHttpError = (response: Response): HttpError => {
    const error = new Error(`Request to ${response.url} failed with status ${response.status}`) as HttpError;
    error.status = response.status;
    error.statusText = response.statusText;
    error.url = response.url;
    return error;
};

/**
 * Converts a path relative to a base URL into an absolute {@link URL} instance.
 */
const toUrl = (baseUrl: string, path: string): URL => {
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    return new URL(normalizedPath, baseUrl);
};

/**
 * Performs an HTTP GET request and parses the JSON payload.
 */
const fetchJson = async (url: URL): Promise<JsonResponse> => {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });

    if (!response.ok) {
        throw createHttpError(response);
    }

    return (await response.json()) as JsonResponse;
};

/**
 * Appends the provided query parameters to the supplied URL.
 */
const appendQueryParameters = (url: URL, queryParams: QueryParameters): void => {
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }

        url.searchParams.set(key, String(value));
    });
};

/**
 * Fetches JSON payloads for static book files hosted on the file CDN.
 *
 * @param path - The file path relative to the base books endpoint (e.g. `/1207.json`).
 * @returns A promise that resolves with the parsed JSON response.
 */
export const getFileJson = async (path: string): Promise<JsonResponse> => {
    const url = toUrl(FILES_BASE_URL, path);
    return fetchJson(url);
};

/**
 * Executes a GET request against the primary turath.io API.
 *
 * @param path - The endpoint path to request (e.g. `/search`).
 * @param queryParams - Optional query parameters to append to the request.
 * @returns A promise that resolves with the parsed JSON body.
 */
export const getJson = async (path: string, queryParams: QueryParameters = {}): Promise<JsonResponse> => {
    const url = toUrl(API_BASE_URL, path);
    appendQueryParameters(url, queryParams);
    return fetchJson(url);
};
