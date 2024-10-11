// Meta information about a book
type BookMeta = {
    author_id: number; // ID of the author
    cat_id: number; // Category ID for classification
    date_built: number; // Unix timestamp for when the data was built
    details: string; // Details about the book, including author and edition information
    has_pdf: boolean; // Flag indicating if a PDF is available
    id: number; // Unique identifier for the book
    name: string; // Name of the book
    size: number; // Size of the book in bytes (presumably for PDF)
};

// Index information about the book, including volumes and PDF mappings
type BookIndexes = {
    hadiths: Record<string, number>; // Mapping of hadith ID to the corresponding number within a volume
    headings: Heading[]; // List of headings in the book
    pdf_base: string; // Base path or name used for locating PDFs
    pdfs: Record<string, string>; // Mapping of volume name to corresponding PDF file name
    volumes: string[]; // List of volume names, e.g., ['المقدمة', '1', '2']
};

// A heading within the book, which includes a title, level, and page number
type Heading = {
    level: number; // Level of the heading (e.g., 1 for main heading, 2 for subheading)
    page: number; // Page number where the heading appears
    title: string; // Title of the heading
};

// Generated index information, providing page mappings and volume boundaries
type GeneratedIndexes = {
    hadith_max: string; // Maximum number of hadiths found in the book
    hadith_pages: Record<string, string>; // Mapping of hadith number to page
    page_headings: Record<number, number[]>; // Mapping of page number to a list of heading indices
    page_map: (null | string)[]; // Array mapping logical page to print page reference
    print_pg_to_pg: Record<string, number>; // Mapping from print pages to logical pages
    volume_bounds: Record<string, [number, number]>; // Boundaries for each volume in terms of page numbers
};

// Represents an individual page within the book
type BookPage = {
    page?: number; // Page number or identifier within the volume
    text: string; // Text content of the page
    vol?: string; // Volume identifier the page belongs to
};

// Main structure representing the complete book information
export type BookFileApiResponse = {
    indexes: BookIndexes; // Indexes for navigating the book
    indexes_generated: GeneratedIndexes; // Additional generated index information
    meta: BookMeta; // Metadata about the book
    pages: BookPage[]; // List of pages in the book
};
