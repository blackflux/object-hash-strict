# object-hash-strict

[![Build Status](https://circleci.com/gh/blackflux/object-hash-strict.png?style=shield)](https://circleci.com/gh/blackflux/object-hash-strict)
[![Test Coverage](https://img.shields.io/coveralls/blackflux/object-hash-strict/master.svg)](https://coveralls.io/github/blackflux/object-hash-strict?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=blackflux/object-hash-strict)](https://dependabot.com)
[![Dependencies](https://david-dm.org/blackflux/object-hash-strict/status.svg)](https://david-dm.org/blackflux/object-hash-strict)
[![NPM](https://img.shields.io/npm/v/object-hash-strict.svg)](https://www.npmjs.com/package/object-hash-strict)
[![Downloads](https://img.shields.io/npm/dt/object-hash-strict.svg)](https://www.npmjs.com/package/object-hash-strict)
[![Semantic-Release](https://github.com/blackflux/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/blackflux/js-gardener/blob/master/assets/badge.svg)](https://github.com/blackflux/js-gardener)

Wrapper around object-hash that restricts allowed values

## Install

Install with [npm](https://www.npmjs.com/):

    $ npm install --save object-hash-strict

## Usage

Use exactly as [object-hash](https://www.npmjs.com/package/object-hash).

## Additional Options

The following options can be provided on top of the existing `object-hash` options.

### allowUndefined

Type: `Array | Boolean`<br>
Default: `[]`

Provide list of keys that are allowed to be undefined. Or boolean to allow any undefined.

## How it's different from object-hash

- Will throw error if a "real" key has an unknown value
- Does not currently deal with "real" path recursion

** Real means a proper object hierarchy, not hidden properties, symbols, etc
