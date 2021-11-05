// Compile specified lodash string template properties into functions.
import defaults from 'lodash.defaults';
import template from 'lodash.template';
import DEFAULT_SETTINGS from '../default-settings';

export function normalize(options: any, templates?: string[]): any {
  // Options override defaults and toc methods.
  const result = defaults({}, options, DEFAULT_SETTINGS);
  // Remove "core" methods from result object.
  ['defaults', 'process', 'anchorize', 'toc'].forEach(function (prop) {
    delete result[prop];
  });
  // Compile Lodash string templates into functions.
  (templates || []).forEach(function (tmpl) {
    if (typeof result[tmpl] === 'string') {
      result[tmpl] = template(result[tmpl]);
    }
  });

  return result;
}
