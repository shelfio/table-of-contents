import template from 'lodash.template';
import {Header, Settings} from '../types';
import {getSettings} from '../default-settings';

export function toc(headers: Header[], settingsOverride?: Partial<Settings>): string {
  settingsOverride = getSettings(settingsOverride);

  const templates = {
    TOC: template(settingsOverride.TOC),
    openUL: template(settingsOverride.openUL),
    closeUL: template(settingsOverride.closeUL),
    openLI: template(settingsOverride.openLI),
    closeLI: template(settingsOverride.closeLI),
    openEmptyLI: template(settingsOverride.openEmptyLI),
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
    const isAlone = levels.length === 0 && header.level > 1;
    console.warn({isAlone, header, cursor, levels});

    // if(levels.length > 0 && )

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

    /**
     * Wrap item in nesting ul/li
     */
    if (isAlone) {
      let openPart = '';
      let closePart = '';
      Array(header.level - 1)
        .join(',')
        .split(',')
        .forEach(() => {
          openPart += `${templates.openUL(header)}${templates.openEmptyLI(header)}`;
          closePart += `${templates.closeLI(header)}${templates.closeUL(header)}`;
        });
      tocs[cursor] = `${openPart}${tocs[cursor]}${closePart}`;
      // console.warn(`haha alone!! adding ${Array(header.level - 1).length} ul/li`, {header, tocs});
    }
  });

  return templates.TOC({toc: tocs.join('')});
}
