// Compile specified lodash string template properties into functions.
import defaults from 'lodash.defaults';
import DEFAULT_SETTINGS from '../default-settings';
import {Settings} from '../types';

export function normalize(options?: Partial<Settings>): Settings {
  return defaults({}, options, DEFAULT_SETTINGS);
}
