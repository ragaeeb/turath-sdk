import { describe, expect, it } from 'vitest';

import { getAuthor, getBookFile, getPage } from '../src/index';

describe('e2e', () => {
    describe('getAuthor', () => {
        it(
            'should get author information',
            async () => {
                const author = await getAuthor(1207);

                expect(author).toEqual({
                    info: expect.any(String),
                });
            },
            { timeout: 5000 },
        );

        it(
            'should handle 404',
            async () => {
                const id = Date.now();
                await expect(getAuthor(id)).rejects.toThrow(`Author ${id} not found`);
            },
            { timeout: 5000 },
        );
    });

    describe('getPage', () => {
        it(
            'should get page information',
            async () => {
                const page = await getPage(17616, 141);

                expect(page).toEqual({
                    meta: {
                        author_name: 'عبد العظيم المنذري',
                        book_name: 'مختصر صحيح مسلم للمنذري ت الألباني',
                        headings: ['كتاب الجنائز', 'باب: في التكبير على الجنازة'],
                        page: 128,
                        page_id: 141,
                        vol: '1',
                    },
                    text: expect.any(String),
                });
            },
            { timeout: 5000 },
        );

        it(
            'should get page information with some missing headings',
            async () => {
                const page = await getPage(30312, 141);

                expect(page).toEqual({
                    meta: {
                        author_name: 'ابن المبرد',
                        book_name: 'جمع الجيوش والدساكر على ابن عساكر',
                        page: 141,
                        page_id: 141,
                        vol: '1',
                    },
                    text: expect.any(String),
                });
            },
            { timeout: 5000 },
        );

        it(
            'should handle 404',
            async () => {
                const book = Date.now();
                const page = Date.now();

                await expect(getPage(book, page)).rejects.toThrow(`Book ${book}, page ${page} not found`);
            },
            { timeout: 5000 },
        );
    });

    describe('getBookFile', () => {
        it.only(
            'should get the book data',
            async () => {
                const book = await getBookFile(17616);

                expect(book.meta).toEqual({
                    author_id: 1207,
                    cat_id: 6,
                    date_built: 1638252675,
                    details: expect.any(String),
                    has_pdf: true,
                    id: 17616,
                    name: 'مختصر صحيح مسلم للمنذري ت الألباني',
                    size: 2792659,
                });

                expect(book.indexes_generated).toEqual({
                    hadith_max: '2176',
                    hadith_pages: expect.objectContaining({ '20': '2' }),
                    page_headings: expect.objectContaining({ '259': [806, 807, 808, 809, 810, 811, 812] }),
                    page_map: expect.arrayContaining([null, '1,8']),
                    print_pg_to_pg: expect.objectContaining({ '1,1': 17 }),
                    volume_bounds: { '1': [1, 239], '2': [245, 581], المقدمة: [2, 15] },
                });

                expect(book.indexes).toEqual({
                    hadiths: expect.objectContaining({ 1: 20, 2176: 589 }),
                    headings: expect.arrayContaining([
                        { level: 1, page: 3, title: 'مقدمة الناشر' },
                        { level: 2, page: 54, title: 'باب: فضل الوضوء' },
                    ]),
                    pdf_base: 'متون الحديث/مختصر صحيح مسلم - المنذري - ت الألباني - ط المكتب الإسلامي - ط6',
                    pdfs: { '1': '42348.pdf', '2': '42348.pdf', المقدمة: '42348p.pdf' },
                    volumes: ['المقدمة', '1', '2'],
                });

                expect(book.pages).toEqual(
                    expect.arrayContaining([
                        {
                            page: '',
                            text: expect.any(String),
                            vol: '',
                        },
                        {
                            page: 87,
                            text: expect.any(String),
                            vol: '1',
                        },
                    ]),
                );

                expect(book.pages).toHaveLength(590);
            },
            { timeout: 20000 },
        );

        it('should catch 404s', async () => {
            const id = Date.now();
            await expect(getBookFile(id)).rejects.toThrow(`Book ${id} not found`);
        });
    });
});
