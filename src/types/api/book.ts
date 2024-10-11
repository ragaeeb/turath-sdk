export type BookQueryParams = {
    /**
     * ID of the book to fetch.
     */
    id: number;

    /**
     * Include additional data such as indexes. Optional parameter.
     * Possible values: 'indexes', 'info', etc.
     */
    include?: string;

    /**
     * Version of the data format. Optional parameter.
     */
    ver?: number;
};

// Metadata of the book
export type BookMeta = {
    /**
     * ID of the author.
     */
    author_id: number;

    /**
     * Page where author details start.
     */
    author_page_start: number;

    /**
     * Category ID that the book belongs to.
     */
    cat_id: number;

    /**
     * The date when the book metadata was built, represented as a Unix timestamp.
     */
    date_built: number;

    /**
     * Unique identifier for the book.
     */
    id: number;

    /**
     * Short information about the book.
     */
    info: string;

    /**
     * Additional detailed information about the book (may be empty).
     */
    info_long: string;

    /**
     * Name of the book.
     */
    name: string;

    /**
     * Indicates the number of times the book has been printed.
     */
    printed: number;

    /**
     * Type of the book (e.g., 5 represents a specific category or classification).
     */
    type: number;

    /**
     * Version information of the book.
     */
    version: string;
};

// Definition for each heading in the index
export type BookHeading = {
    /**
     * Level of the heading (e.g., 1 for major sections, 3 for smaller subsections).
     */
    level: number;

    /**
     * Page number where this heading starts.
     */
    page: number;

    /**
     * Title of the heading.
     */
    title: string;
};

// Indexes that exist in the book
export type BookIndexes = {
    /**
     * Headings present within the book.
     */
    headings: BookHeading[];

    /**
     * Additional non-author content (e.g., prefaces, intros). May be empty.
     */
    non_author: any[];

    /**
     * Maps each page to the headings that begin on it.
     */
    page_headings: Record<number, number[]>;

    /**
     * Maps pages to their corresponding volume and page number.
     */
    page_map: string[];

    /**
     * Mapping from volume and print page to actual page number.
     */
    print_pg_to_pg: Record<string, number>;

    /**
     * Boundaries for each volume, specified as starting and ending page.
     */
    volume_bounds: Record<string, [number, number]>;

    /**
     * Volumes available in the book.
     */
    volumes: string[];
};

export type BookApiResponse = {
    /**
     * Indexes of the book.
     */
    indexes: BookIndexes;

    /**
     * Metadata information about the book.
     */
    meta: BookMeta;
};
