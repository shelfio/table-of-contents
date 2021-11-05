import {untag} from './untag';

it('no tags to strip', () => {
  expect(untag('foo')).toEqual('foo');
});

it('should strip tags #1', () => {
  expect(untag('<b>foo</b>')).toEqual('foo');
});

it('should strip tags #2', () => {
  expect(untag('<b attribute=whatever>foo</b>')).toEqual('foo');
});

it('should strip tags #3', () => {
  expect(untag('<B>foo</B>')).toEqual('foo');
});

it('should strip tags #4', () => {
  expect(untag('<B><i>foo</i> <span><i>bar<i></span></B>')).toEqual('foo bar');
});

it('should not strip entities', () => {
  expect(untag('<i>foo&amp;bar</i>')).toEqual('foo&amp;bar');
});
