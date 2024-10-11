[![wakatime](https://wakatime.com/badge/user/a0b906ce-b8e7-4463-8bce-383238df6d4b/project/c57d4b46-a567-4de0-9c97-a4589b33f8ee.svg)](https://wakatime.com/badge/user/a0b906ce-b8e7-4463-8bce-383238df6d4b/project/c57d4b46-a567-4de0-9c97-a4589b33f8ee) [![E2E](https://github.com/ragaeeb/turath-sdk/actions/workflows/e2e.yml/badge.svg)](https://github.com/ragaeeb/turath-sdk/actions/workflows/e2e.yml) [![Node.js CI](https://github.com/ragaeeb/turath-sdk/actions/workflows/build.yml/badge.svg)](https://github.com/ragaeeb/turath-sdk/actions/workflows/build.yml) ![GitHub License](https://img.shields.io/github/license/ragaeeb/turath-sdk) ![GitHub Release](https://img.shields.io/github/v/release/ragaeeb/turath-sdk) [![codecov](https://codecov.io/gh/ragaeeb/turath-sdk/graph/badge.svg?token=82MVUIM7MJ)](https://codecov.io/gh/ragaeeb/turath-sdk) [![Size](https://deno.bundlejs.com/badge?q=turath-sdk@1.0.0)](https://bundlejs.com/?q=turath-sdk%401.0.0) ![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label&color=blue) ![npm](https://img.shields.io/npm/v/turath-sdk) ![npm](https://img.shields.io/npm/dm/turath-sdk) ![GitHub issues](https://img.shields.io/github/issues/ragaeeb/turath-sdk) ![GitHub stars](https://img.shields.io/github/stars/ragaeeb/turath-sdk?style=social)

# turath-sdk

SDK to access ketabonline.com APIs.

## Installation

To install turath-sdk, use npm or yarn:

```bash
npm install turath-sdk
# or
yarn add turath-sdk
# or
pnpm i turath-sdk
```

## Usage

### Importing the SDK

```javascript
import { getBookInfo, getBookContents, downloadBook } from 'turath-sdk';
```

### Get Book Information

Retrieve metadata about a specific book.

```javascript
(async () => {
    try {
        const bookInfo = await getBookInfo(123);
        console.log(bookInfo);
    } catch (error) {
        console.error(error.message);
    }
})();
```

### Get Book Contents

Fetch the contents of a book, including chapters and sections.

```javascript
(async () => {
    try {
        const bookContents = await getBookContents(123);
        console.log(bookContents);
    } catch (error) {
        console.error(error.message);
    }
})();
```

### Download Book

Download a book's data to a local file.

```javascript
(async () => {
    try {
        const outputFilePath = await downloadBook(123, './book.json');
        console.log(`Book downloaded to ${outputFilePath}`);
    } catch (error) {
        console.error(error.message);
    }
})();
```
