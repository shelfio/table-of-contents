import {escape as escapeHtml, template} from 'lodash-es';
import type {Header, Settings} from '../types.js';
import {getSettings} from '../default-settings.js';

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
      const templateData = {...header, text: escapeHtml(header.text)};
      tocs[cursor] += templates.openUL(templateData);
      tocs.push(templates.closeLI(templateData) + templates.closeUL(templateData));
      tocs[cursor] += templates.openLI(templateData);
    } else {
      header.depth = levels.length;
      const templateData = {...header, text: escapeHtml(header.text)};
      tocs[cursor] += templates.closeLI(templateData);
      tocs[cursor] += templates.openLI(templateData);
    }
  });

  // eslint-disable-next-line new-cap
  return templates.TOC({toc: tocs.join('')});
}
