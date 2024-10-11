import { PageMetadata, PageResult, SearchOptions, SearchResults } from './types';
import { AuthorApiQueryParameters, AuthorApiResponse } from './types/api/author';
import { BookApiQueryParameters, BookApiResponse, Includes } from './types/api/book';
import { BookFileApiResponse } from './types/api/bookFile';
import { PageApiQueryParameters, PageApiResponse } from './types/api/page';
import { SearchApiQueryParameters, SearchApiResponse } from './types/api/search';
import { getFileJson, getJson } from './utils/network';

const API_VERSION_NUMBER = 3;

export const getAuthor = async (id: number): Promise<AuthorApiResponse> => {
    const queryParams: AuthorApiQueryParameters = { id, ver: API_VERSION_NUMBER };
    const { info } = (await getJson('/author', queryParams)) as AuthorApiResponse;

    if (!info) {
        throw new Error(`Author ${id} not found`);
    }

    return { info };
};

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

export const getBookInfo = async (id: number): Promise<BookApiResponse> => {
    const queryParams: BookApiQueryParameters = { id, include: Includes.Indexes, ver: API_VERSION_NUMBER };
    const book = (await getJson(`/book`, queryParams)) as BookApiResponse;

    return book;
};

export const getPage = async (bookId: number, pageNumber: number): Promise<PageResult> => {
    const queryParams: PageApiQueryParameters = { book_id: bookId, pg: pageNumber, ver: API_VERSION_NUMBER };
    const { meta, text } = (await getJson('/page', queryParams)) as PageApiResponse;

    if (!meta && !text) {
        throw new Error(`Book ${bookId}, page ${pageNumber} not found`);
    }

    return { meta: JSON.parse(meta) as PageMetadata, text };
};

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
