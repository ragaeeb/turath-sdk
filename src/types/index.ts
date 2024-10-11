import { PageApiResponse } from './api/page';
import { SearchResult as ApiSearchResult } from './api/search';

export type PageMetadata = {
    author_name: string;
    book_name: string;
    headings?: string[];
    page: number;
    page_id: number;
    vol: string;
};

export type PageResult = {
    meta: PageMetadata;
} & Omit<PageApiResponse, 'meta'>;

export enum SortField {
    PageId = 'page_id',
}

export type SearchOptions = {
    author?: number;
    book?: number;
    category?: number;
    page?: number;
    precision?: number;
    sortField?: SortField;
};

export type SearchResult = {
    meta: PageMetadata;
} & Omit<ApiSearchResult, 'meta'>;

export type SearchResults = {
    count: number;
    data: SearchResult[];
};
