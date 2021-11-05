// Anchorize all headers and inline a generated TOC, returning processed HTML.
import {anchorize} from './anchorize';
import {toc} from './toc';
import {normalize} from '../default-settings';

export function process(src: string, options?: Parameters<typeof anchorize>[1]): string {
  // Get anchorized HTML and headers array.
  const anchorized = anchorize(src, options);
  // Generate TOC from headers array.
  const tocHtml = toc(anchorized.headers);

  // Insert the generated TOC into the anchorized HTML.
  return anchorized.html.replace(normalize(options).placeholder, tocHtml);
}
