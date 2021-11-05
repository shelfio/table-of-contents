import template from 'lodash.template';
import defaults from 'lodash.defaults';
import DEFAULT_SETTINGS from './default-settings';
import {Header, TOC} from './types';

export const toc: TOC = {
  toc(headers: Header[], options?: any): any {
    // Normalize options and compile template(s).
    options = normalize(options, ['TOC', 'openUL', 'closeUL', 'openLI', 'closeLI']);

    // Build TOC.
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
  },
};

export default toc;

// Compile specified lodash string template properties into functions.
export function normalize(options: any, templates?: string[]): any {
  // Options override defaults and toc methods.
  const result = defaults({}, options, toc, DEFAULT_SETTINGS);
  // Remove "core" methods from result object.
  ['defaults', 'process', 'anchorize', 'toc'].forEach(function (prop) {
    delete result[prop];
  });
  // Compile Lodash string templates into functions.
  (templates || []).forEach(function (tmpl) {
    if (typeof result[tmpl] === 'string') {
      result[tmpl] = template(result[tmpl]);
    }
  });

  return result;
}
