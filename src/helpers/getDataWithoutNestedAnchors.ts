/* eslint-disable complexity */
import {type TemplateExecutor} from 'lodash';
import type {Header} from '../types.js';

const parser = new DOMParser();

const hasAnchorTagsInHeader = (data: Header) => {
  const doc = parser.parseFromString(data.all, 'text/html');

  // Extract any existing anchor tags from the header variable
  const anchorElement = doc.querySelector('a');

  return anchorElement?.outerHTML;
};

export const getDataWithoutNestedAnchors = (data: Header, headerTemplate: TemplateExecutor) => {
  const results = headerTemplate(data);

  if (!hasAnchorTagsInHeader(data)) {
    return results;
  }

  // separately parse the results to get the anchor tag
  const doc = parser.parseFromString(data.all, 'text/html');

  const anchor = document.createElement('a');
  anchor.setAttribute('href', `#${data.anchor}`);
  anchor.setAttribute('name', `${data.anchor}`);
  anchor.innerHTML = '<wbr>';

  const headerNode = doc.querySelector(`h${data.level}`);

  headerNode?.prepend(anchor);

  const html = doc.body.innerHTML;

  return html || results;
};
