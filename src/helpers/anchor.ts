import {decode} from 'entities';
import slug from 'slug';
import {untag} from './untag';

export function anchor(s: string): string {
  s = untag(s);
  s = s.toLowerCase();
  s = decode(s);
  s = s.replace(/['"!]|[\\.]+$/g, '');
  s = slug(s);
  s = s.replace(/[:\\(\\)]+/gi, '-');
  s = s.replace(/[\s\\-]*([\\.])[\s\\-]*/g, '$1');
  s = s.replace(/-+/g, '-');
  s = s.replace(/^-+|-+$/g, '');

  return s;
}
