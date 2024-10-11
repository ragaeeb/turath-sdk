import { PageResponseMetadata } from './api/page';

export type PageResponse = {
    meta: PageResponseMetadata;
    text: string;
};
