import wretch, { type Wretch } from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';

const baseApi = wretch('https://api.turath.io').addon(QueryStringAddon);
const fileApi: Wretch = wretch('https://files.turath.io/books');

/**
 * Represents the generic JSON structure returned by the turath.io APIs.
 */
type JsonResponse = Record<string, unknown>;

/**
 * Fetches JSON payloads for static book files hosted on the file CDN.
 *
 * @param path - The file path relative to the base books endpoint (e.g. `/1207.json`).
 * @returns A promise that resolves with the parsed JSON response.
 */
export const getFileJson = async (path: string): Promise<JsonResponse> => {
    return fileApi.url(path).get().json();
};

/**
 * Executes a GET request against the primary turath.io API.
 *
 * @param path - The endpoint path to request (e.g. `/search`).
 * @param queryParams - Optional query parameters to append to the request.
 * @returns A promise that resolves with the parsed JSON body.
 */
export const getJson = async (path: string, queryParams: JsonResponse = {}): Promise<JsonResponse> => {
    return baseApi.url(path).query(queryParams).get().json();
};
