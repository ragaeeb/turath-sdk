[![wakatime](https://wakatime.com/badge/user/a0b906ce-b8e7-4463-8bce-383238df6d4b/project/c57d4b46-a567-4de0-9c97-a4589b33f8ee.svg)](https://wakatime.com/badge/user/a0b906ce-b8e7-4463-8bce-383238df6d4b/project/c57d4b46-a567-4de0-9c97-a4589b33f8ee) [![E2E](https://github.com/ragaeeb/turath-sdk/actions/workflows/e2e.yml/badge.svg)](https://github.com/ragaeeb/turath-sdk/actions/workflows/e2e.yml) [![Node.js CI](https://github.com/ragaeeb/turath-sdk/actions/workflows/build.yml/badge.svg)](https://github.com/ragaeeb/turath-sdk/actions/workflows/build.yml) ![GitHub License](https://img.shields.io/github/license/ragaeeb/turath-sdk) ![GitHub Release](https://img.shields.io/github/v/release/ragaeeb/turath-sdk) [![codecov](https://codecov.io/gh/ragaeeb/turath-sdk/graph/badge.svg?token=82MVUIM7MJ)](https://codecov.io/gh/ragaeeb/turath-sdk) [![Size](https://deno.bundlejs.com/badge?q=turath-sdk@1.0.0)](https://bundlejs.com/?q=turath-sdk%401.0.0) ![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label&color=blue) ![npm](https://img.shields.io/npm/v/turath-sdk) ![npm](https://img.shields.io/npm/dm/turath-sdk) ![GitHub issues](https://img.shields.io/github/issues/ragaeeb/turath-sdk) ![GitHub stars](https://img.shields.io/github/stars/ragaeeb/turath-sdk?style=social)

# turath-sdk

JavaScript SDK for accessing the books and resources provided by turath.io. This SDK allows you to interact with the turath.io API to retrieve book information, author details, specific pages, and perform searches across the database.

## Installation

To install turath-sdk, use npm or yarn:

```bash
npm install turath-sdk
# or
yarn add turath-sdk
# or
pnpm i turath-sdk
```

## Requirements

Node.js >= `20.0.0`

## Development

This repository uses [Bun](https://bun.sh/) for dependency management and testing during development.

```bash
bun install
bun run build
bun test           # unit tests with coverage
bun test testing   # end-to-end tests
bun run lint       # Biome static analysis
```

## Usage

The SDK provides several functions to interact with the turath.io API. Below are the main functions that you can use:

### Importing the SDK

```javascript
import { getBookInfo } from 'turath-sdk';
```

### 1. getAuthor

Fetches information about an author by their ID.

```typescript
import { getAuthor } from 'turath-sdk';

(async () => {
    try {
        const author = await getAuthor(44);
        console.log(author);
    } catch (error) {
        console.error(error.message);
    }
})();
```

Parameters:

`id` (`number`): The unique identifier of the author.

Returns: A promise that resolves to the author's information.

Throws: Will throw an error if the author is not found.

### 2. `getBookFile`

Fetches the JSON file of a book by its ID.

```typescript
import { getBookFile } from 'turath-sdk';

(async () => {
    try {
        const bookFile = await getBookFile(147927);
        console.log(bookFile);
    } catch (error) {
        console.error(error.message);
    }
})();
```

Parameters:

`id` (`number`): The unique identifier of the book.

Returns: A promise that resolves to the book file information.

Throws: Will throw an error if the book file is not found.

### 3. `getBookInfo`

Fetches the information about a book, including its metadata and indexes.

```typescript
import { getBookInfo } from 'turath-sdk';

(async () => {
    const bookInfo = await getBookInfo(147927);
    console.log(bookInfo);
})();
```

Parameters:

`id` (`number`): The unique identifier of the book.

Returns: A promise that resolves to the book information including indexes.

### 4. `getPage`

Fetches a specific page from a book by its book ID and page number.

```typescript
import { getPage } from 'turath-sdk';

(async () => {
    try {
        const page = await getPage(147927, 5);
        console.log(page);
    } catch (error) {
        console.error(error.message);
    }
})();
```

Parameters:

`bookId` (`number`): The unique identifier of the book.

`pageNumber` (`number`): The page number to retrieve.

Returns: A promise that resolves to the page metadata and text.

Throws: Will throw an error if the page is not found.

### 5. `search`

Searches for books or content using a query string.

```typescript
import { search } from 'turath-sdk';

(async () => {
    const results = await search('الإسلام', { category: 6 });
    console.log(results);
})();
```

Parameters:

`query` (`string`): The search query string.

`options` (`SearchOptions`, optional): Additional search options such as category or sorting field.

Returns: A promise that resolves to the search results, including count and data.

## Contributing

If you'd like to contribute to the SDK, feel free to fork the repository and submit a pull request. Contributions are welcome!

## License

This SDK is licensed under the MIT License.
