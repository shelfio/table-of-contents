import toc from './';

it('should export everything', () => {
  expect(toc.anchor).toBeInstanceOf(Function);
  expect(toc.anchorize).toBeInstanceOf(Function);
  expect(toc.process).toBeInstanceOf(Function);
  expect(toc.toc).toBeInstanceOf(Function);
  expect(toc.unique).toBeInstanceOf(Function);
  expect(toc.untag).toBeInstanceOf(Function);
  expect(toc.DEFAULT_SETTINGS).toBeInstanceOf(Object);
});
