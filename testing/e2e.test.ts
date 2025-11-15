import { describe, expect, it } from 'bun:test';

import { getAuthor, getBookFile, getBookInfo, getPage, search } from '../src/index';

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
                        headings: [],
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
        it(
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
            { timeout: 10000 },
        );

        it('should catch 404s', async () => {
            const id = Date.now();
            await expect(getBookFile(id)).rejects.toThrow(`Book ${id} not found`);
        });
    });

    describe('getBookInfo', () => {
        it(
            'should get the book data',
            async () => {
                const book = await getBookInfo(147927);

                expect(book).toEqual({
                    indexes: {
                        headings: expect.arrayContaining([
                            { level: 1, page: 2, title: 'تقديم مصطفى العدوي' },
                            { level: 3, page: 51, title: 'الحديث الخامس' },
                        ]),
                        non_author: [],
                        page_headings: expect.objectContaining({ 2: [1], 67: [68] }),
                        page_map: expect.arrayContaining(['1,1', '1,67']),
                        print_pg_to_pg: expect.objectContaining({ '1,1': 1, '1,67': 67 }),
                        volume_bounds: { '1': [1, 67] },
                        volumes: ['1'],
                    },
                    meta: {
                        author_id: 44,
                        author_page_start: 1,
                        cat_id: 6,
                        date_built: 1686885098,
                        id: 147927,
                        info: expect.any(String),
                        info_long: '',
                        name: 'الأربعون النووية مع زيادات ابن رجب',
                        printed: 3,
                        type: 5,
                        version: '1.0',
                    },
                });
            },
            { timeout: 10000 },
        );

        it('should catch 404s', async () => {
            const id = Date.now();
            await expect(getBookInfo(id)).rejects.toThrow(expect.any(Error));
        });
    });

    describe('search', () => {
        it(
            'should do a basic search',
            async () => {
                const results = await search(`مُجَاهِدٌ وَعِكْرِمَةُ`);
                expect(results.count > 19000).toBe(true);
                expect(results.data[0]).toEqual({
                    author_id: expect.any(Number),
                    book_id: expect.any(Number),
                    cat_id: expect.any(Number),
                    meta: {
                        author_name: expect.any(String),
                        book_name: expect.any(String),
                        headings: expect.any(Array),
                        page: expect.any(Number),
                        page_id: expect.any(Number),
                        vol: expect.any(String),
                    },
                    snip: expect.any(String),
                    text: expect.any(String),
                });
            },
            { timeout: 10000 },
        );

        it(
            'should filter by category',
            async () => {
                const results = await search(`مُجَاهِدٌ وَعِكْرِمَةُ`, { category: 4 });
                expect(results.data[0].cat_id).toEqual(4);
            },
            { timeout: 10000 },
        );

        it(
            'should filter by author',
            async () => {
                const results = await search(`مُجَاهِدٌ وَعِكْرِمَةُ`, { author: 51 });
                expect(results.data[0].author_id).toEqual(51);
            },
            { timeout: 10000 },
        );

        it(
            'should filter by book',
            async () => {
                const results = await search(`مُجَاهِدٌ وَعِكْرِمَةُ`, { book: 2176 });
                expect(results.data[0].book_id).toEqual(2176);
            },
            { timeout: 10000 },
        );
    });
});
