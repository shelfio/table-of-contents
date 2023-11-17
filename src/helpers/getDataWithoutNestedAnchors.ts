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

const getCleanTocAnchor = (doc: Document, data: Header) => {
  const firstAnchorElement = doc.querySelector(`a[href="#${data.anchor}"]`);

  if (firstAnchorElement) {
    firstAnchorElement.innerHTML = '<wbr />';
  }

  return firstAnchorElement;
};

export const getDataWithoutNestedAnchors = (data: Header, headerTemplate: TemplateExecutor) => {
  const results = headerTemplate(data);

  if (!hasAnchorTagsInHeader(data)) {
    return headerTemplate(data);
  }

  // separately parse the results to get the anchor tag
  const resultsDoc = parser.parseFromString(results, 'text/html');

  const cleanAnchorNode = getCleanTocAnchor(resultsDoc, data);

  // parse the original header to get the header node
  const doc = parser.parseFromString(data.all, 'text/html');

  const headerNode = doc.querySelector(`h${data.level}`);

  if (headerNode && cleanAnchorNode) {
    const firstHeaderChild = headerNode.firstChild;

    if (!firstHeaderChild) {
      return;
    }

    headerNode.insertBefore(cleanAnchorNode, firstHeaderChild);
  } else {
    return results;
  }

  return doc.body.innerHTML || results;
};
