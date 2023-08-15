import template from 'lodash.template';
import type {Header, Settings} from '../types';
import {getSettings} from '../default-settings';
import {untag} from './untag';
import {unique} from './unique';
import {anchor} from './anchor';

// Parse HTML, returning an array of header objects and anchorized HTML.
export function anchorize(
  src: string,
  settingsOverride?: Partial<
    Pick<Settings, 'headers' | 'tocMin' | 'tocMax' | 'anchorMin' | 'anchorMax' | 'header'>
  >
): {src: string; html: string; headers: Header[]} {
  // Normalize options and compile template(s).
  settingsOverride = getSettings(settingsOverride);

  const headerTemplate = template(settingsOverride.header);

  // Process HTML, "anchorizing" headers as-specified.
  const headers: Header[] = [];
  const names = {};
  const html = src.replace(settingsOverride.headers!, function (all, level, attrs, header) {
    level = Number(level);
    // @ts-ignore
    const tocLevel = level >= settingsOverride.tocMin && level <= settingsOverride.tocMax;
    // @ts-ignore
    const anchorLevel = level >= settingsOverride.anchorMin && level <= settingsOverride.anchorMax;
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
    return anchorLevel ? headerTemplate(data) : all;
  });

  return {
    src: src,
    html: html,
    headers: headers,
  };
}
