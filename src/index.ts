import template from 'lodash.template';
import defaults from 'lodash.defaults';
import DEFAULT_SETTINGS from './default-settings';
import {Header, TOC} from './types';
import {untag} from './helpers/untag';
import {unique} from './helpers/unique';
import {anchor} from './helpers/anchor';

export const toc: TOC = {
  // Anchorize all headers and inline a generated TOC, returning processed HTML.
  process(src: any, options?: any): any {
    // Get anchorized HTML and headers array.
    const anchorized = toc.anchorize(src, options);
    // Generate TOC from headers array.
    const tocHtml = toc.toc(anchorized.headers, options);

    // Insert the generated TOC into the anchorized HTML.
    return anchorized.html.replace(normalize(options).placeholder, tocHtml);
  },
  // Parse HTML, returning an array of header objects and anchorized HTML.
  anchorize(src: string, options?: any): {src: string; html: string; headers: Header[]} {
    // Normalize options and compile template(s).
    options = normalize(options, ['header']);

    // Process HTML, "anchorizing" headers as-specified.
    const headers: Header[] = [];
    const names = {};
    const html = src.replace(options.headers, function (all, level, attrs, header) {
      level = Number(level);
      const tocLevel = level >= options.tocMin && level <= options.tocMax;
      const anchorLevel = level >= options.anchorMin && level <= options.anchorMax;
      let data: Header;

      if (tocLevel || anchorLevel) {
        // This data is passed into the specified "header" template function.
        data = {
          // The header level number in <H?>...</H?>
          level: level,
          // Any attributes in the open H? tag.
          attrs: attrs,
          // Header HTML contents.
          header: header,
          // Un-tagged header HTML contents.
          text: untag(header),
          // Unique anchor name for this header.
          anchor: unique(names, anchor(header)),
          // All HTML (including tags) matched by the "headers" RegExp.
          all: all,
        };
      }

      if (tocLevel) {
        // @ts-ignore
        headers.push(data);
      }

      // @ts-ignore
      return anchorLevel ? options.header(data) : all;
    });

    return {
      src: src,
      html: html,
      headers: headers,
    };
  },
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
function normalize(options: any, templates?: string[]): any {
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
