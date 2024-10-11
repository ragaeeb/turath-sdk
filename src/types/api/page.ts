export type PageResponseMetadata = {
    author_name: string;
    book_name: string;
    headings?: string[];
    page: number;
    page_id: number;
    vol: string;
};

export type PageApiResponse = {
    meta: string;
    text: string;
};

export type PageApiQueryParameters = {
    book_id: number;
    pg: number;
    ver: number;
};
