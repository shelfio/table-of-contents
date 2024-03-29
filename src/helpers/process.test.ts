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
