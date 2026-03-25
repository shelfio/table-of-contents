import {template} from 'lodash-es';
import {decodeHTML} from 'entities';
import type {Header, Settings} from '../types.js';
import {getSettings} from '../default-settings.js';
import {untag} from './untag.js';
import {unique} from './unique.js';
import {anchor} from './anchor.js';

function normalizeAnchorText(text: string): string {
  // Convert NBSP to regular spaces, collapse inner whitespace for anchor stability, and trim.
  return text
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAnchorSource(text: string): string {
  const normalizedText = normalizeAnchorText(text);

  return normalizedText === '' ? text.trim() : normalizedText;
}

function isLevelInRange(level: number, min: number, max: number): boolean {
  return level >= min && level <= max;
}

// Parse HTML, returning an array of header objects and anchorized HTML.
export function anchorize(
  src: string,
  settingsOverride?: Partial<
    Pick<Settings, 'headers' | 'tocMin' | 'tocMax' | 'anchorMin' | 'anchorMax' | 'header'>
  >
): {src: string; html: string; headers: Header[]} {
  // Normalize options and compile template(s).
  const settings = getSettings(settingsOverride);
  const headerTemplate = template(settings.header);

  // Process HTML, "anchorizing" headers as-specified.
  const headers: Header[] = [];
  const names = {};
  const html = src.replace(settings.headers, function (all, level, attrs, header) {
    level = Number(level);
    const tocLevel = isLevelInRange(level, settings.tocMin, settings.tocMax);
    const anchorLevel = isLevelInRange(level, settings.anchorMin, settings.anchorMax);

    if (!tocLevel && !anchorLevel) {
      return all;
    }

    const untaggedHeader = untag(header);
    const decodedHeader = decodeHTML(untaggedHeader);
    const normalizedHeader = decodedHeader.replace(/\u00a0/g, ' ');
    const anchorSource = getAnchorSource(normalizedHeader);

    // This data is passed into the specified "header" template function.
    const data: Header = {
      // The header level number in <H?>...</H?>
      level: level,
      // Any attributes in the open H? tag.
      attrs: attrs,
      // Header HTML contents.
      header: header,
      // Un-tagged header HTML contents.
      text: normalizedHeader,
      // Unique anchor name for this header.
      anchor: unique(names, anchor(anchorSource)),
      // All HTML (including tags) matched by the "headers" RegExp.
      all: all,
    };

    if (tocLevel) {
      headers.push(data);
    }

    if (anchorLevel) {
      return headerTemplate(data);
    }

    return all;
  });

  return {
    src: src,
    html: html,
    headers: headers,
  };
}
