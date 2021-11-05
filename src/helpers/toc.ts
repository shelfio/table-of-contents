import {Header} from '../types';
import {normalize} from './normalize';

export function toc(headers: Header[], options?: any): any {
  // Normalize options and compile template(s).
  options = normalize(options, ['TOC', 'openUL', 'closeUL', 'openLI', 'closeLI']);

  // Build TOC
  let cursor = 0;
  const levels: number[] = [];
  const tocs = [''];

  headers.forEach(function (header) {
    while (header.level < levels[0]) {
      levels.shift();
      cursor++;
    }
    if (levels.length === 0 || header.level > levels[0]) {
      levels.unshift(header.level);
      header.depth = levels.length;
      tocs[cursor] += options.openUL(header);
      tocs.push(options.closeLI(header) + options.closeUL(header));
    } else {
      header.depth = levels.length;
      tocs[cursor] += options.closeLI(header);
    }
    tocs[cursor] += options.openLI(header);
  });

  return options.TOC({toc: tocs.join('')});
}
