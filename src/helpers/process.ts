// Anchorize all headers and inline a generated TOC, returning processed HTML.
import {anchorize} from './anchorize';
import {toc} from './toc';
import {getSettings} from '../default-settings';

export function process(src: string, settingsOverride?: Parameters<typeof anchorize>[1]): string {
  // Get anchorized HTML and headers array.
  const anchorized = anchorize(src, settingsOverride);
  // Generate TOC from headers array.
  const tocHtml = toc(anchorized.headers);

  // Insert the generated TOC into the anchorized HTML.
  return anchorized.html.replace(getSettings(settingsOverride).placeholder, tocHtml);
}
