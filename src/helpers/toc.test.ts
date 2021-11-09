import {toc} from './toc';

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
  const actual = toc(headers);
  const expected =
    '<div class="toc"><ul><li><a href="#h2-header">H2 Header</a><ul><li><a href="#h3-header">H3 Header</a></li></ul></li></ul></div>';

  expect(actual).toEqual(expected);
});

it('should return lower levels if provided as designated', function () {
  const headers = [
    {
      all: '<h4 b=2 c=3><b>H4</b> Header</h4>',
      anchor: 'h4-header',
      attrs: ' b=2 c=3',
      header: '<b>H4</b> Header',
      level: 4,
      text: 'H4 Header',
    },
    {
      all: '<h3 b=2 c=3><b>H3</b> Header</h3>',
      anchor: 'h3-header',
      attrs: ' b=2 c=3',
      header: '<b>H3</b> Header',
      level: 3,
      text: 'H3 Header',
    },
    {
      all: '<h2 a=1><b>H2</b> Header</h2>',
      anchor: 'h2-header',
      attrs: ' a=1',
      header: '<b>H2</b> Header',
      level: 2,
      text: 'H2 Header',
    },
    {
      all: '<h4 b=2 c=3><b>H4</b> Header</h4>',
      anchor: 'h4-header',
      attrs: ' b=2 c=3',
      header: '<b>H4</b> Header',
      level: 4,
      text: 'H4 Header',
    },
    {
      all: '<h3 b=2 c=3><b>H3</b> Header</h3>',
      anchor: 'h3-header-1',
      attrs: ' b=2 c=3',
      header: '<b>H3</b> Header',
      level: 3,
      text: 'H3 Header',
    },
    {
      all: '<h2 a=1><b>H2</b> Header</h2>',
      anchor: 'h2-header',
      attrs: ' a=1',
      header: '<b>H2</b> Header',
      level: 2,
      text: 'H2 Header',
    },
    {
      all: '<h1 a=1><b>H1</b> Header</h1>',
      anchor: 'h1-header',
      attrs: ' a=1',
      header: '<b>H1</b> Header',
      level: 1,
      text: 'H1 Header',
    },
    {
      all: '<h3 b=2 c=3><b>H3</b> Header</h3>',
      anchor: 'h3-header-1',
      attrs: ' b=2 c=3',
      header: '<b>H3</b> Header',
      level: 3,
      text: 'H3 Header',
    },
  ];
  const actual = toc(headers);
  const expected = `<div class="toc"><ul><li style="list-style-type: none;"><ul><li style="list-style-type: none;"><ul><li style="list-style-type: none;"><ul><li><a href="#h4-header">H4 Header</a></li></ul></li></ul></li></ul><ul><li style="list-style-type: none;"><ul><li style="list-style-type: none;"></li></ul><ul><li><a href="#h3-header">H3 Header</a></li></ul></li></ul><ul><li style="list-style-type: none;"></li></ul><ul><li><a href="#h2-header">H2 Header</a></li></ul><ul><li><a href="#h4-header">H4 Header</a></li></ul><ul><li><a href="#h3-header-1">H3 Header</a></li></ul></li><li><a href="#h2-header">H2 Header</a></li></ul><ul><li><a href="#h1-header">H1 Header</a><ul><li><a href="#h3-header-1">H3 Header</a></li></ul></li></ul></div>`;

  expect(actual).toEqual(expected);
});
