import path from 'path';
import fs from 'fs';
import {process} from './process.js';

function fixture(name: string): string {
  const htmlfile = path.join(__dirname, '../', 'fixtures', `${name}.html`);

  return fs.readFileSync(htmlfile).toString();
}

it('should process using default options', () => {
  const actual = process(fixture('basic'));

  expect(actual).toEqual(fixture('basic-expected'));
});

it('anchors should be unique', () => {
  const actual = process(fixture('unique'));

  expect(actual).toEqual(fixture('unique-expected'));
});

it('should the correct headers should be anchorized', () => {
  const actual = process(fixture('anchorminmax'), {anchorMin: 3, anchorMax: 5});

  expect(actual).toEqual(fixture('anchorminmax-expected'));
});

it('should TOC should only contain the correct anchors', () => {
  const actual = process(fixture('tocminmax'), {tocMin: 3, tocMax: 5});

  expect(actual).toEqual(fixture('tocminmax-expected'));
});

it('should handle anchor tags content properly', () => {
  const actual = process(fixture('nested'), {tocMin: 1, anchorMin: 1});

  expect(actual).toEqual(fixture('nested-expected'));
});

it('should handle anchor tags content properly 1', () => {
  const actual = process(fixture('emptyanchor'), {tocMin: 1, anchorMin: 1});

  expect(actual).toEqual(fixture('emptyanchor-expected'));
});

it('should decode entities and normalize whitespace in TOC entries', () => {
  const actual = process(fixture('nbsp-headings'));

  expect(actual).toEqual(fixture('nbsp-headings-expected'));
});

it('should not turn encoded HTML into live elements inside the TOC', () => {
  const actual = process(fixture('dangerous-entities'));

  expect(actual).toEqual(fixture('dangerous-entities-expected'));
});

it('should decode entities for consumer text while keeping generated TOC escaped', () => {
  const src =
    '<!-- toc -->\n<h2>Fish &amp; Chips</h2>\n<h3>"Quoted" &amp; &#39;single&#39;</h3>\n<h2>Non&nbsp;Breaking&nbsp;Space</h2>';
  const actual = process(src);

  expect(actual).toContain('<a href="#fish-chips">Fish &amp; Chips</a>');
  expect(actual).toContain(
    '<a href="#quoted-single">&quot;Quoted&quot; &amp; &#39;single&#39;</a>'
  );
  expect(actual).toContain('<a href="#non-breaking-space">Non Breaking Space</a>');
  expect(actual).toContain(
    '<a href="#fish-chips" name="fish-chips"><wbr /></a>Fish &amp; Chips</h2>'
  );
});
