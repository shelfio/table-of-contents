import fs from 'fs';
import path from 'path';
import toc from './';

function fixture(name: string): string {
  const htmlfile = path.join(__dirname, 'fixtures', `${name}.html`);

  return fs.readFileSync(htmlfile).toString();
}

describe('untag', () => {
  it('no tags to strip', () => {
    expect(toc.untag('foo')).toEqual('foo');
  });

  it('should strip tags #1', () => {
    expect(toc.untag('<b>foo</b>')).toEqual('foo');
  });

  it('should strip tags #2', () => {
    expect(toc.untag('<b attribute=whatever>foo</b>')).toEqual('foo');
  });

  it('should strip tags #3', () => {
    expect(toc.untag('<B>foo</B>')).toEqual('foo');
  });

  it('should strip tags #4', () => {
    expect(toc.untag('<B><i>foo</i> <span><i>bar<i></span></B>')).toEqual('foo bar');
  });

  it('should not strip entities', () => {
    expect(toc.untag('<i>foo&amp;bar</i>')).toEqual('foo&amp;bar');
  });
});

describe('anchor', () => {
  it('should anchor is already lovely', () => {
    expect(toc.anchor('foo')).toEqual('foo');
  });

  it('should spaces get converted to -', () => {
    expect(toc.anchor('foo    bar     baz')).toEqual('foo-bar-baz');
  });

  it('should leading / trailing spaces get stripped', () => {
    expect(toc.anchor('     foo  bar     ')).toEqual('foo-bar');
  });

  it('should multiple - get converted to -', () => {
    expect(toc.anchor('foo----bar-----baz')).toEqual('foo-bar-baz');
  });

  it('should leading / trailing - get stripped', () => {
    expect(toc.anchor('-----foo  bar-----')).toEqual('foo-bar');
  });

  it('should quotes get stripped', () => {
    expect(toc.anchor('i can\'t "go" for that')).toEqual('i-cant-go-for-that');
  });

  it('should some other chars get stripped, yay', () => {
    expect(toc.anchor('obj / obj.method(this, [that])')).toEqual('obj-objmethodthis-that');
  });

  it('should remove unnecessary - chars', () => {
    expect(toc.anchor('obj.method ( this, [ that ] )')).toEqual('objmethod-this-that');
  });

  it('should replace : with - chars', () => {
    expect(toc.anchor('this: that :: the other')).toEqual('this-that-the-other');
  });

  it('should entities and utf characters should be made happy', () => {
    expect(toc.anchor('фøó &amp; βåρ ♥ Бäž')).toEqual('foo-bar-baz');
  });
});

describe('unique', () => {
  const names = {};

  it('should should be unique', () => {
    expect(toc.unique(names, 'foo')).toEqual('foo');
  });

  it('no longer unique #1.', () => {
    expect(toc.unique(names, 'foo')).toEqual('foo-1');
  });

  it('no longer unique #2.', () => {
    expect(toc.unique(names, 'foo')).toEqual('foo-2');
  });

  it('should be unique', () => {
    expect(toc.unique(names, 'bar')).toEqual('bar');
  });

  it('not unique #1', () => {
    expect(toc.unique(names, 'foo-1')).toEqual('foo-1-1');
  });

  it('not unique #2', () => {
    expect(toc.unique(names, 'foo-2')).toEqual('foo-2-1');
  });
});

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

describe('process', () => {
  it('should process using default options', () => {
    const actual = toc.process(fixture('basic'));

    expect(actual).toEqual(fixture('basic-expected'));
  });

  it('anchors should be unique', () => {
    const actual = toc.process(fixture('unique'));

    expect(actual).toEqual(fixture('unique-expected'));
  });

  it('should the correct headers should be anchorized', () => {
    const actual = toc.process(fixture('anchorminmax'), {anchorMin: 3, anchorMax: 5});

    expect(actual).toEqual(fixture('anchorminmax-expected'));
  });

  it('should TOC should only contain the correct anchors', () => {
    const actual = toc.process(fixture('tocminmax'), {tocMin: 3, tocMax: 5});

    expect(actual).toEqual(fixture('tocminmax-expected'));
  });
});
