import type { PageApiResponse } from './api/page';
import type { SearchResult as ApiSearchResult } from './api/search';

/**
 * Metadata describing the location and attribution details for a page result.
 */
export type PageMetadata = {
    /** Human-readable name of the author for the page. */
    author_name: string;
    /** Human-readable name of the book containing the page. */
    book_name: string;
    /**
     * Hierarchical headings that contextualise the page within the book's structure.
     * When no headings are available the array may be omitted.
     */
    headings?: string[];
    /** The logical page number within the book. */
    page: number;
    /** Unique identifier for the page. */
    page_id: number;
    /** Volume identifier for multi-volume works. */
    vol: string;
};

/**
 * Canonical structure returned to consumers for individual page lookups.
 */
export type PageResult = {
    /** Metadata describing the page. */
    meta: PageMetadata;
} & Omit<PageApiResponse, 'meta'>;

/**
 * Fields supported by the public API for ordering search results.
 */
export enum SortField {
    /** Sort results by page identifier. */
    PageId = 'page_id',
}

/**
 * Optional arguments accepted by the {@link search} helper when querying turath.io.
 */
export type SearchOptions = {
    /** Filter results by author identifier. */
    author?: number;
    /** Filter results by book identifier. */
    book?: number;
    /** Filter results by category identifier. */
    category?: number;
    /** Specific page of results to fetch when paginating. */
    page?: number;
    /** Search precision flag supported by the API. */
    precision?: number;
    /** Ordering strategy for the returned results. */
    sortField?: SortField;
};

/**
 * Search hit returned from the turath.io API with parsed metadata.
 */
export type SearchResult = {
    /** Metadata describing where the hit belongs in the corpus. */
    meta: PageMetadata;
} & Omit<ApiSearchResult, 'meta'>;

/**
 * Envelope containing aggregated data for a search request.
 */
export type SearchResults = {
    /** Total number of search matches. */
    count: number;
    /** Individual search hits. */
    data: SearchResult[];
};
