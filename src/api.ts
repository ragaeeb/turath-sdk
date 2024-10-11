import { PageResponse } from './types';
import { AuthorApiQueryParameters, AuthorApiResponse } from './types/api/author';
import { BookFileApiResponse } from './types/api/bookFile';
import { PageApiQueryParameters, PageApiResponse, PageResponseMetadata } from './types/api/page';
import { SearchApiQueryParameters, SearchApiResponse } from './types/api/search';
import { getFileJson, getJson } from './utils/network';

export const getAuthor = async (id: number): Promise<AuthorApiResponse> => {
    const queryParams: AuthorApiQueryParameters = { id, ver: 3 };
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

export const getPage = async (bookId: number, pageNumber: number): Promise<PageResponse> => {
    const queryParams: PageApiQueryParameters = { book_id: bookId, pg: pageNumber, ver: 3 };
    const { meta, text } = (await getJson('/page', queryParams)) as PageApiResponse;

    if (!meta && !text) {
        throw new Error(`Book ${bookId}, page ${pageNumber} not found`);
    }

    return { meta: JSON.parse(meta) as PageResponseMetadata, text };
};

export const search = async (id: number) => {
    const queryParams: SearchApiQueryParameters = {};
    const searchResults = (await getJson('/search')) as SearchApiResponse;
    const file = (await getFileJson(`/${id}.json`)) as BookFileApiResponse;
};
