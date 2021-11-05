import template from 'lodash.template';
import {Header, Settings} from '../types';
import {normalize} from '../default-settings';

export function toc(headers: Header[], options?: Partial<Settings>): string {
  options = normalize(options);

  const templates = {
    TOC: template(options.TOC),
    openUL: template(options.openUL),
    closeUL: template(options.closeUL),
    openLI: template(options.openLI),
    closeLI: template(options.closeLI),
  };

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
      tocs[cursor] += templates.openUL(header);
      tocs.push(templates.closeLI(header) + templates.closeUL(header));
    } else {
      header.depth = levels.length;
      tocs[cursor] += templates.closeLI(header);
    }
    tocs[cursor] += templates.openLI(header);
  });

  return templates.TOC({toc: tocs.join('')});
}
