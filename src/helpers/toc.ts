import template from 'lodash.template';
import type {Header, Settings} from '../types';
import {getSettings} from '../default-settings';

export function toc(headers: Header[], settingsOverride?: Partial<Settings>): string {
  settingsOverride = getSettings(settingsOverride);

  const templates = {
    TOC: template(settingsOverride.TOC),
    openUL: template(settingsOverride.openUL),
    closeUL: template(settingsOverride.closeUL),
    openLI: template(settingsOverride.openLI),
    closeLI: template(settingsOverride.closeLI),
  };

  // Build TOC
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
      tocs[cursor] += templates.openUL(header);
      tocs.push(templates.closeLI(header) + templates.closeUL(header));
    } else {
      header.depth = levels.length;
      tocs[cursor] += templates.closeLI(header);
    }
    tocs[cursor] += templates.openLI(header);
  });

  // eslint-disable-next-line new-cap
  return templates.TOC({toc: tocs.join('')});
}
