import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { getBookInfo } from './index';
import { httpsGet } from './utils/network';

vi.mock('./utils/network', () => ({
    httpsGet: vi.fn(),
}));

vi.mock('./utils/io', () => ({
    unzipFromUrl: vi.fn(),
}));

describe('index', () => {
    describe('getBookInfo', () => {
        let mockHttpsGet: Mock;

        beforeEach(() => {
            vi.clearAllMocks();
            mockHttpsGet = httpsGet as Mock;
        });

        it('should return book info when response code is 200', async () => {
            const mockResponse = {
                code: 200,
                data: { author: 'Test Author', title: 'Test Book' },
                emptyArrayKey: [],
                emptyKey: '',
                emptyObjectKey: {},
                nestedObject: { nestedEmptyKey: {} },
                nullKey: null,
                status: true,
                undefinedKey: undefined,
                zeroKey: 0,
            };
            mockHttpsGet.mockResolvedValue(mockResponse);

            const result = await getBookInfo(123);
            expect(result).toEqual({ author: 'Test Author', title: 'Test Book' });
        });

        it('should throw error when response code is 404', async () => {
            const mockResponse = {
                code: 404,
                message: 'Not Found',
                status: false,
            };
            mockHttpsGet.mockResolvedValue(mockResponse);

            await expect(getBookInfo(123)).rejects.toThrow('Book 123 not found');
        });

        it('should throw error when response code is unknown', async () => {
            const mockResponse = {
                code: 500,
                message: 'Internal Server Error',
                status: false,
            };
            mockHttpsGet.mockResolvedValue(mockResponse);

            await expect(getBookInfo(123)).rejects.toThrow(
                'Unknown error: {"code":500,"message":"Internal Server Error","status":false}',
            );
        });
    });
});
