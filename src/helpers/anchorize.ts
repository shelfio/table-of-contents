import template from 'lodash.template';
import type {Header, Settings} from '../types.js';
import {getSettings} from '../default-settings.js';
import {untag} from './untag.js';
import {unique} from './unique.js';
import {anchor} from './anchor.js';
import {getDataWithoutNestedAnchors} from './getDataWithoutNestedAnchors.js';

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
  // @ts-ignore
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
      headers.push(data!);
    }

    if (anchorLevel) {
      return getDataWithoutNestedAnchors(data!, headerTemplate);
    }

    return all;
  });

  return {
    src: src,
    html: html,
    headers: headers,
  };
}
