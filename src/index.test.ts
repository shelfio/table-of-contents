import toc from './';

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
