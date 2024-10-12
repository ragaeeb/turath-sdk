import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { getAuthor, getBookFile, getBookInfo, getPage, search, SortField } from '../src/index';
import { getFileJson, getJson } from './utils/network';

vi.mock('./utils/network');

describe('api', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAuthor', () => {
        it('should get author information', async () => {
            (getJson as Mock).mockResolvedValue({ info: 'A' });
            const author = await getAuthor(1207);

            expect(getJson).toHaveBeenCalledOnce();
            expect(getJson).toHaveBeenCalledWith('/author', { id: 1207, ver: 3 });

            expect(author).toEqual({
                info: 'A',
            });
        });

        it('should throw error when not found', async () => {
            (getJson as Mock).mockResolvedValue({});

            await expect(getAuthor(123)).rejects.toThrow('Author 123 not found');
        });
    });

    describe('getBookFile', () => {
        it('should get book data', async () => {
            (getFileJson as Mock).mockResolvedValue({ id: 1207 });
            const book = await getBookFile(1207);

            expect(getFileJson).toHaveBeenCalledOnce();
            expect(getFileJson).toHaveBeenCalledWith('/1207.json');

            expect(book).toEqual({
                id: 1207,
            });
        });

        it('should throw error not found', async () => {
            (getFileJson as Mock).mockRejectedValue({ status: 404 });

            await expect(getBookFile(123)).rejects.toThrow('Book 123 not found');
        });

        it('should throw other errors as is', async () => {
            (getFileJson as Mock).mockRejectedValue({ status: 500 });

            await expect(getBookFile(123)).rejects.toThrow(expect.objectContaining({ status: 500 }));
        });
    });

    describe('getBookInfo', () => {
        it('should get book information', async () => {
            (getJson as Mock).mockResolvedValue({ info: 'A' });
            const book = await getBookInfo(1207);

            expect(getJson).toHaveBeenCalledOnce();
            expect(getJson).toHaveBeenCalledWith('/book', { id: 1207, include: 'indexes', ver: 3 });

            expect(book).toEqual({
                info: 'A',
            });
        });
    });

    describe('getPage', () => {
        it('should get page information', async () => {
            (getJson as Mock).mockResolvedValue({ meta: '{"foo":"abcd"}', text: 'body' });
            const page = await getPage(100, 1207);

            expect(getJson).toHaveBeenCalledOnce();
            expect(getJson).toHaveBeenCalledWith('/page', { book_id: 100, pg: 1207, ver: 3 });

            expect(page).toEqual({
                meta: { foo: 'abcd' },
                text: 'body',
            });
        });

        it('should throw error when not found', async () => {
            (getJson as Mock).mockResolvedValue({});

            await expect(getPage(123, 567)).rejects.toThrow(`Book 123, page 567 not found`);
        });
    });

    describe('search', () => {
        it('should search with just query', async () => {
            (getJson as Mock).mockResolvedValue({ count: 1, data: [{ meta: '{"foo":"abcd"}', text: '123' }] });
            const results = await search('query');

            expect(getJson).toHaveBeenCalledOnce();
            expect(getJson).toHaveBeenCalledWith('/search', { q: 'query', ver: 3 });

            expect(results).toEqual({
                count: 1,
                data: [{ meta: { foo: 'abcd' }, text: '123' }],
            });
        });

        it('should filter by category and sort', async () => {
            (getJson as Mock).mockResolvedValue({ count: 1, data: [{ meta: '{}', text: '123' }] });
            const results = await search('query', { category: 2, sortField: SortField.PageId });

            expect(getJson).toHaveBeenCalledOnce();
            expect(getJson).toHaveBeenCalledWith('/search', { cat_id: 2, q: 'query', sort: 'page_id', ver: 3 });

            expect(results).toEqual({
                count: 1,
                data: [{ meta: {}, text: '123' }],
            });
        });

        it('should filter by author, book, and precision', async () => {
            (getJson as Mock).mockResolvedValue({ count: 1, data: [{ meta: '{}', text: '123' }] });
            const results = await search('query', { author: 1, book: 2, precision: 3 });

            expect(getJson).toHaveBeenCalledOnce();
            expect(getJson).toHaveBeenCalledWith('/search', { author: 1, book: 2, precision: 3, q: 'query', ver: 3 });

            expect(results).toEqual({
                count: 1,
                data: [{ meta: {}, text: '123' }],
            });
        });

        it('should access next page of results', async () => {
            (getJson as Mock).mockResolvedValue({ count: 1, data: [{ meta: '{}', text: '123' }] });
            const results = await search('query', { author: 1, category: 3, page: 2 });

            expect(getJson).toHaveBeenCalledOnce();
            expect(getJson).toHaveBeenCalledWith('/search', { author: 1, cat_id: 3, page: 2, q: 'query', ver: 3 });

            expect(results).toEqual({
                count: 1,
                data: [{ meta: {}, text: '123' }],
            });
        });
    });
});
