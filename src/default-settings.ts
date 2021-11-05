import defaults from 'lodash.defaults';
import {Settings} from './types';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const DEFAULT_SETTINGS: Settings = {
  // DEFAULTS FOR toc.process()
  //
  // RegExp to replace with generated TOC.
  placeholder: /<!--\s*toc\s*-->/gi,

  // DEFAULTS FOR toc.anchorize()
  //
  // Match H? headers and all their contents.
  headers: /<h(\d)(\s*[^>]*)>([\s\S]+?)<\/h\1>/gi,
  // Min and max headers to add to TOC.
  tocMin: 2,
  tocMax: 6,
  // Min and max headers to anchorize.
  anchorMin: 2,
  anchorMax: 6,
  // Anchorized header template.
  header:
    '<h<%= level %><%= attrs %>><a href="#<%= anchor %>" name="<%= anchor %>"><%= header %></a></h<%= level %>>',

  // DEFAULTS FOR toc.toc()
  //
  // TOC part templates.
  openUL: '<ul>',
  closeUL: '</ul>',
  openLI: '<li><a href="#<%= anchor %>"><%= text %></a>',
  // openLI: '<li><a href="#<%= anchor %>"><%= text %></a> (<%= depth %> / H<%= level %>)',
  closeLI: '</li>',
  // Main TOC template.
  TOC: '<div class="toc"><%= toc %></div>',
};

export function getSettings(settingsOverride?: Partial<Settings>): Settings {
  return defaults({}, settingsOverride, DEFAULT_SETTINGS);
}
