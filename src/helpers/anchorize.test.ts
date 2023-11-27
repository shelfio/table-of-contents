import {anchorize} from './anchorize.js';

const src =
  '<h1><b>H1</b> Header</h1>\n<h2 a=1><b>H2</b> Header</h2>\n<h3 b=2 c=3><b>H3</b> Header</h3>';
const expected =
  '<h1><b>H1</b> Header</h1>\n<h2 a=1><a href="#h2-header" name="h2-header"><wbr /></a><b>H2</b> Header</h2>\n<h3 b=2 c=3><a href="#h3-header" name="h3-header"><wbr /></a><b>H3</b> Header</h3>';
const actual = anchorize(src);

it('should return unprocessed src.', () => {
  expect(actual.src).toEqual(src);
});

it('should return processed html.', () => {
  expect(actual.html).toEqual(expected);
});

it('should return array of header objects.', () => {
  expect(actual.headers).toEqual([
    {
      level: 2,
      attrs: ' a=1',
      header: '<b>H2</b> Header',
      text: 'H2 Header',
      anchor: 'h2-header',
      all: '<h2 a=1><b>H2</b> Header</h2>',
    },
    {
      level: 3,
      attrs: ' b=2 c=3',
      header: '<b>H3</b> Header',
      text: 'H3 Header',
      anchor: 'h3-header',
      all: '<h3 b=2 c=3><b>H3</b> Header</h3>',
    },
  ]);
});
