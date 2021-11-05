import {anchor} from './helpers/anchor';
import {anchorize} from './helpers/anchorize';
import {process} from './helpers/process';
import {toc} from './helpers/toc';
import {unique} from './helpers/unique';
import {untag} from './helpers/untag';
import DEFAULT_SETTINGS from './default-settings';

export {anchor} from './helpers/anchor';
export {anchorize} from './helpers/anchorize';
export {process} from './helpers/process';
export {toc} from './helpers/toc';
export {unique} from './helpers/unique';
export {untag} from './helpers/untag';
export * as DEFAULT_SETTINGS from './default-settings';

const TOC = {
  DEFAULT_SETTINGS,
  anchor,
  anchorize,
  process,
  toc,
  unique,
  untag,
};

export default TOC;
