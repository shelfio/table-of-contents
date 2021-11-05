// Anchorize all headers and inline a generated TOC, returning processed HTML.
import toc, {normalize} from '../index';
import {anchorize} from './anchorize';

export function process(src: any, options?: any): any {
  // Get anchorized HTML and headers array.
  const anchorized = anchorize(src, options);
  // Generate TOC from headers array.
  const tocHtml = toc.toc(anchorized.headers, options);

  // Insert the generated TOC into the anchorized HTML.
  return anchorized.html.replace(normalize(options).placeholder, tocHtml);
}
