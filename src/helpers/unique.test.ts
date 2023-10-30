import {unique} from './unique.js';

const names = {};

it('should should be unique', () => {
  expect(unique(names, 'foo')).toEqual('foo');
});

it('no longer unique #1.', () => {
  expect(unique(names, 'foo')).toEqual('foo-1');
});

it('no longer unique #2.', () => {
  expect(unique(names, 'foo')).toEqual('foo-2');
});

it('should be unique', () => {
  expect(unique(names, 'bar')).toEqual('bar');
});

it('not unique #1', () => {
  expect(unique(names, 'foo-1')).toEqual('foo-1-1');
});

it('not unique #2', () => {
  expect(unique(names, 'foo-2')).toEqual('foo-2-1');
});
