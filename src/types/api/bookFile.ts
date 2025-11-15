/**
 * Meta information about a book.
 */
type BookMeta = {
    /** Identifier of the author who wrote the book. */
    author_id: number;
    /** Category identifier that classifies the book. */
    cat_id: number;
    /** Unix timestamp indicating when the data snapshot was generated. */
    date_built: number;
    /** Free-form description covering edition details and other notes. */
    details: string;
    /** Indicates whether an associated PDF is available. */
    has_pdf: boolean;
    /** Unique identifier for the book. */
    id: number;
    /** Display name of the book. */
    name: string;
    /** Size of the downloadable book asset in bytes. */
    size: number;
};

/**
 * Heading information used to navigate the book contents.
 */
type Heading = {
    /** Hierarchical level of the heading within the book structure. */
    level: number;
    /** Page number where the heading begins. */
    page: number;
    /** Human-readable title of the heading. */
    title: string;
};

/**
 * Index information about the book, including volumes and PDF mappings.
 */
type BookIndexes = {
    /** Mapping of hadith identifier to the page number where it appears. */
    hadiths: Record<string, number>;
    /** List of navigational headings within the book. */
    headings: Heading[];
    /** Base path or identifier used to locate the PDF assets. */
    pdf_base: string;
    /** Mapping of volume identifiers to their PDF filenames. */
    pdfs: Record<string, string>;
    /** Ordered list of volume names within the work. */
    volumes: string[];
};

/**
 * Generated index information providing page mappings and volume boundaries.
 */
type GeneratedIndexes = {
    /** Maximum hadith identifier present in the book. */
    hadith_max: string;
    /** Mapping of hadith identifiers to their corresponding pages. */
    hadith_pages: Record<string, string>;
    /** Mapping of page numbers to heading indices. */
    page_headings: Record<number, number[]>;
    /** Array mapping logical pages to their print-page references. */
    page_map: (null | string)[];
    /** Mapping from printed page references to logical page numbers. */
    print_pg_to_pg: Record<string, number>;
    /** Boundaries for each volume in the form of starting and ending page numbers. */
    volume_bounds: Record<string, [number, number]>;
};

/**
 * Represents an individual page within the book.
 */
type BookPage = {
    /** Page number or identifier within the volume. */
    page?: number;
    /** Text content of the page. */
    text: string;
    /** Volume identifier that the page belongs to. */
    vol?: string;
};

/**
 * Complete book information returned by the static file endpoint.
 */
export type BookFileApiResponse = {
    /** Indexes for navigating the book. */
    indexes: BookIndexes;
    /** Additional generated index information for cross-references. */
    indexes_generated: GeneratedIndexes;
    /** Metadata describing the book. */
    meta: BookMeta;
    /** Full set of rendered book pages. */
    pages: BookPage[];
};
