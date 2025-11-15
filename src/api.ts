import type { PageMetadata, PageResult, SearchOptions, SearchResults } from './types';
import type { AuthorApiQueryParameters, AuthorApiResponse } from './types/api/author';
import type { BookApiQueryParameters, BookApiResponse } from './types/api/book';
import { Includes } from './types/api/book';
import type { BookFileApiResponse } from './types/api/bookFile';
import type { PageApiQueryParameters, PageApiResponse } from './types/api/page';
import type { SearchApiQueryParameters, SearchApiResponse } from './types/api/search';
import { getFileJson, getJson } from './utils/network';

/**
 * Version of the public API requested for all outbound calls.
 */
const API_VERSION_NUMBER = 3;

/**
 * Fetches author information by ID.
 *
 * @param id - The unique identifier of the author to retrieve.
 * @returns A promise that resolves to the author information.
 * @throws Will throw an error if the author is not found.
 */
export const getAuthor = async (id: number): Promise<AuthorApiResponse> => {
    const queryParams: AuthorApiQueryParameters = { id, ver: API_VERSION_NUMBER };
    const { info } = (await getJson('/author', queryParams)) as AuthorApiResponse;

    if (!info) {
        throw new Error(`Author ${id} not found`);
    }

    return { info };
};

/**
 * Fetches the book contents by ID.
 *
 * @param id - The unique identifier of the book to retrieve.
 * @returns A promise that resolves to the book file information.
 * @throws Will throw an error if the book file is not found.
 */
export const getBookFile = async (id: number): Promise<BookFileApiResponse> => {
    try {
        const file = (await getFileJson(`/${id}.json`)) as BookFileApiResponse;
        return file;
    } catch (err: any) {
        if (err.status === 404) {
            throw new Error(`Book ${id} not found`);
        }

        throw err;
    }
};

/**
 * Fetches the book information by ID.
 *
 * @param id - The unique identifier of the book to retrieve.
 * @returns A promise that resolves to the book information including indexes.
 */
export const getBookInfo = async (id: number): Promise<BookApiResponse> => {
    const queryParams: BookApiQueryParameters = { id, include: Includes.Indexes, ver: API_VERSION_NUMBER };
    const book = (await getJson(`/book`, queryParams)) as BookApiResponse;

    return book;
};

/**
 * Fetches a specific page from a book by book ID and page number.
 *
 * @param bookId - The unique identifier of the book.
 * @param pageNumber - The page number to retrieve.
 * @returns A promise that resolves to the page metadata and text.
 * @throws Will throw an error if the page is not found.
 */
export const getPage = async (bookId: number, pageNumber: number): Promise<PageResult> => {
    const queryParams: PageApiQueryParameters = { book_id: bookId, pg: pageNumber, ver: API_VERSION_NUMBER };
    const { meta, text } = (await getJson('/page', queryParams)) as PageApiResponse;

    if (!meta && !text) {
        throw new Error(`Book ${bookId}, page ${pageNumber} not found`);
    }

    return { meta: JSON.parse(meta) as PageMetadata, text };
};

/**
 * Searches for books or content using a query string.
 *
 * @param query - The search query string.
 * @param options - Optional search options, such as category or sort field.
 * @returns A promise that resolves to the search results.
 */
export const search = async (
    query: string,
    { category, sortField, ...options }: SearchOptions = {},
): Promise<SearchResults> => {
    const queryParams: SearchApiQueryParameters = {
        ...options,
        ...(category && { cat_id: category }),
        ...(sortField && { sort: sortField }),
        q: query,
        ver: API_VERSION_NUMBER,
    };
    const { count, data } = (await getJson('/search', queryParams)) as SearchApiResponse;

    return { count, data: data.map((r) => ({ ...r, meta: JSON.parse(r.meta) })) };
};
