import {Header} from '../types';
import {untag} from './untag';
import {unique} from './unique';
import {anchor} from './anchor';
import {normalize} from './normalize';

// Parse HTML, returning an array of header objects and anchorized HTML.
export function anchorize(
  src: string,
  options?: any
): {src: string; html: string; headers: Header[]} {
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
}
