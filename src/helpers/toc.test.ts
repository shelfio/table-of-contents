import {anchorize} from './anchorize.js';
import {toc} from './toc.js';

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

it('should escape decoded header text when generating TOC HTML', () => {
  const src =
    '<h2>Fish &amp; Chips</h2>\n<h3>"Quoted" &amp; &#39;single&#39;</h3>\n<h2>Non&nbsp;Breaking&nbsp;Space</h2>';
  const {headers} = anchorize(src);
  const actual = toc(headers);
  const expected =
    '<div class="toc"><ul><li><a href="#fish-chips">Fish &amp; Chips</a><ul><li><a href="#quoted-single">&quot;Quoted&quot; &amp; &#39;single&#39;</a></li></ul></li><li><a href="#non-breaking-space">Non Breaking Space</a></li></ul></div>';

  expect(actual).toEqual(expected);
});

it('should render decoded characters in the DOM while keeping HTML escaped in source', () => {
  const src =
    '<h2>Fish &amp; Chips</h2>\n<h3>"Quoted" &amp; &#39;single&#39;</h3>\n<h2>Non&nbsp;Breaking&nbsp;Space</h2>';
  const {headers} = anchorize(src);
  const html = toc(headers);
  const container = document.createElement('div');
  container.innerHTML = html;
  const links = Array.from(container.querySelectorAll('a')).map(a => a.textContent);

  expect(links).toEqual(['Fish & Chips', '"Quoted" & \'single\'', 'Non Breaking Space']);
});
