import {anchor} from './anchor';

it('should anchor is already lovely', () => {
  expect(anchor('foo')).toEqual('foo');
});

it('should spaces get converted to -', () => {
  expect(anchor('foo    bar     baz')).toEqual('foo-bar-baz');
});

it('should leading / trailing spaces get stripped', () => {
  expect(anchor('     foo  bar     ')).toEqual('foo-bar');
});

it('should multiple - get converted to -', () => {
  expect(anchor('foo----bar-----baz')).toEqual('foo-bar-baz');
});

it('should leading / trailing - get stripped', () => {
  expect(anchor('-----foo  bar-----')).toEqual('foo-bar');
});

it('should quotes get stripped', () => {
  expect(anchor('i can\'t "go" for that')).toEqual('i-cant-go-for-that');
});

it('should some other chars get stripped, yay', () => {
  expect(anchor('obj / obj.method(this, [that])')).toEqual('obj-objmethodthis-that');
});

it('should remove unnecessary - chars', () => {
  expect(anchor('obj.method ( this, [ that ] )')).toEqual('objmethod-this-that');
});

it('should replace : with - chars', () => {
  expect(anchor('this: that :: the other')).toEqual('this-that-the-other');
});

it('should entities and utf characters should be made happy', () => {
  expect(anchor('фøó &amp; βåρ ♥ Бäž')).toEqual('foo-bar-baz');
});
