import wretch, { Wretch } from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';

const baseApi = wretch('https://api.turath.io').addon(QueryStringAddon);
const fileApi: Wretch = wretch('https://files.turath.io/books');

type JsonResponse = Record<string, any>;

export const getFileJson = async (path: string): Promise<JsonResponse> => {
    return fileApi.url(path).get().json();
};

export const getJson = async (path: string, queryParams: JsonResponse = {}): Promise<JsonResponse> => {
    return baseApi.url(path).query(queryParams).get().json();
};
