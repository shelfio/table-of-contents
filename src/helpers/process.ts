// Anchorize all headers and inline a generated TOC, returning processed HTML.
import {anchorize} from './anchorize';
import {toc} from './toc';
import {normalize} from './normalize';

export function process(src: any, options?: any): any {
  // Get anchorized HTML and headers array.
  const anchorized = anchorize(src, options);
  // Generate TOC from headers array.
  const tocHtml = toc(anchorized.headers, options);

  // Insert the generated TOC into the anchorized HTML.
  return anchorized.html.replace(normalize(options).placeholder, tocHtml);
}
