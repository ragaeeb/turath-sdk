type SearchResult = {
    author_id: number;
    book_id: number;
    cat_id: number;
    meta: string;
    snip: string;
    text: string;
};

export type SearchApiResponse = {
    count: number;
    data: SearchResult[];
};

export type SearchApiQueryParameters = {
    author?: number;
    book: number;
    precision: number;
    q: string;
    sort?: string;
    ver: number;
};
