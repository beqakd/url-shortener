# Changelog

# 0.1.0 (2025-04-08)


### Features

* add release-it configuration for versioning and changelog generation ([609fb96](https://github.com/beqakd/url-shortener/commit/609fb9636dcd1a5012fa595434960b08251002f4))
* **database:** Update URLs table structure by dropping unused columns and adding new fields for clicks and expiration ([cf4b3c8](https://github.com/beqakd/url-shortener/commit/cf4b3c8695e7538f704ff5e1fe8f80b01ca4dbf2))
* **health:** Add health check endpoint and Swagger documentation integration ([d856919](https://github.com/beqakd/url-shortener/commit/d8569191b3f696f06f2330bec2f6f73990312bc6))
* **husky:** add commit message linting with Commitlint configuration ([402274b](https://github.com/beqakd/url-shortener/commit/402274bb548c46efe324e381f5b73aff7c4f1ad6))
* **husky:** Add pre-commit hook for running tests and linting ([4baaec0](https://github.com/beqakd/url-shortener/commit/4baaec05dda8fd1e14a1dded9efb39dbe96153c8))
* new tool ([2b8f227](https://github.com/beqakd/url-shortener/commit/2b8f2275ac8853626b4d6da59c29a3d172d89269))
* refactor ([ff915c7](https://github.com/beqakd/url-shortener/commit/ff915c7844fc4dbc885939941a23be0b2795dc26))
* **release-it:** update before:init hook to run formatting before linting ([b759fbb](https://github.com/beqakd/url-shortener/commit/b759fbb34374c6d8cd26c8bbfb32e8e13b35bfe1))
* **url:** Add click count tracking and related event handling ([d0a6bd5](https://github.com/beqakd/url-shortener/commit/d0a6bd5d01b8ac3be10903f82185104e893ede32))
* **url:** Implement URL expiration handling with BullMQ integration and add deleteUrl method ([5b35da0](https://github.com/beqakd/url-shortener/commit/5b35da089d4ce75dccd42d09dace5626adae0e92))
* **url:** Refactor URL handling to improve shortened URL retrieval and add validation for short code format ([68d09e3](https://github.com/beqakd/url-shortener/commit/68d09e3faec16d8189992c29e7db7238ef3a3f78))
* **url:** Remove global prefix from URL shortener and update controller routing ([74d3133](https://github.com/beqakd/url-shortener/commit/74d3133b042d34806c9a23c24d6a2292cbaebb56))
