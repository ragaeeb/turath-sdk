import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { getAuthor, getBookFile, getBookInfo, getPage, search } from '../src/index';
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
});
