import fs from 'fs';
import path from 'path';
import toc from './';

function fixture(name: string): string {
  const htmlfile = path.join(__dirname, 'fixtures', `${name}.html`);

  return fs.readFileSync(htmlfile).toString();
}

describe('anchorize', () => {
  const src =
    '<h1><b>H1</b> Header</h1>\n<h2 a=1><b>H2</b> Header</h2>\n<h3 b=2 c=3><b>H3</b> Header</h3>';
  const expected =
    '<h1><b>H1</b> Header</h1>\n<h2 a=1><a href="#h2-header" name="h2-header"><b>H2</b> Header</a></h2>\n<h3 b=2 c=3><a href="#h3-header" name="h3-header"><b>H3</b> Header</a></h3>';
  const actual = toc.anchorize(src);

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
});

describe('toc', () => {
  it('should return generated TOC html', () => {
    const headers = [
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
    ];
    const actual = toc.toc(headers);
    const expected =
      '<div class="toc"><ul><li><a href="#h2-header">H2 Header</a><ul><li><a href="#h3-header">H3 Header</a></li></ul></li></ul></div>';

    expect(actual).toEqual(expected);
  });
});
