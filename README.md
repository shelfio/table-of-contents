# table-of-contents [![CircleCI](https://circleci.com/gh/shelfio/table-of-contents/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/table-of-contents/tree/master)![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> Linkify HTML headers and generate a TOC.
>
> Forked from [node-toc](https://github.com/cowboy/node-toc)
>
> Rewritten in TypeScript & refactored to reduce bundle size (by not using entire lodash library)

## Install

```
$ yarn add @shelf/table-of-contents
```

## Usage

```js
const toc = require('@shelf/table-of-contents');
```

### toc.untag

Strip HTML tags from a string.

```js
const stripped = toc.untag(html);
```

### toc.anchor

Convert a string of text into something URL-friendly and not too ugly.

```js
const anchor = toc.anchor(arbitraryText);
```

### toc.unique

Get a unique name and store the returned name in names for future unique-name-gettingness.

```js
const names = {};
const guaranteedUniqueAnchor1 = toc.unique(names, toc.anchor(arbitraryText));
const guaranteedUniqueAnchor2 = toc.unique(names, toc.anchor(arbitraryText));
```

### toc.process

Anchorize all headers and inline a generated TOC, returning processed HTML.

```js
const htmlWithAnchorsAndTOC = toc.process(html [, options]);
```

#### options

- **placeholder** - `RegExp` - Used to match TOC placeholder. Defaults to `/<!--\s*toc\s*-->/gi`.
- _Because this method calls the `toc.anchorize` and `toc.toc` methods internally, their options may be specified as well._

### toc.anchorize

Parse HTML, returning an array of header objects and anchorized HTML.

```js
const obj = toc.anchorize(html [, options]);
```

#### options

- **headers** - `RegExp` - Used to match HTML headers. Defaults to `/<h(\d)(\s*[^>]*)>([\s\S]+?)<\/h\1>/gi`.
- **tocMin** - `Number` - Min header level to add to TOC. Defaults to `2`.
- **tocMax** - `Number` - Max header level to add to TOC. Defaults to `6`.
- **anchorMin** - `Number` - Min header level to anchorize. Defaults to `2`.
- **anchorMax** - `Number` - Max header level to anchorize. Defaults to `6`.
- **header** - `String` | `Function` - Lodash template string or function used to anchorize a header.

### toc.toc

Generate TOC HTML from an array of header objects.

```js
const obj = toc.toc(headers [, options]);
```

#### options

- **openUL** - `String` | `Function` - Lodash template string or function used to generate the TOC.
- **closeUL** - `String` | `Function` - Lodash template string or function used to generate the TOC.
- **openLI** - `String` | `Function` - Lodash template string or function used to generate the TOC.
- **closeLI** - `String` | `Function` - Lodash template string or function used to generate the TOC.
- **TOC** - `String` | `Function` - Lodash template string or function used to wrap the generated TOC.

## Examples

The default HTML is pretty awesome, but you can customize the hell out of the generated HTML, eg.

```js
const processedHTML = toc.process(unprocessedHTML, {
  header: '<h<%= level %><%= attrs %> id="<%= anchor %>"><%= header %></h<%= level %>>',
  TOC: '<div class="toc"><%= toc %></div>',
  openUL: '<ul data-depth="<%= depth %>">',
  closeUL: '</ul>',
  openLI: '<li data-level="H<%= level %>"><a href="#<%= anchor %>"><%= text %></a>',
  closeLI: '</li>',
});
```

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)
