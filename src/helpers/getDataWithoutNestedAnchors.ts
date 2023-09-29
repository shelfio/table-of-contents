import {parse} from 'node-html-parser';
import type {TemplateExecutor} from 'lodash';
import type {Header} from '../types';

const extractAnchorTags = (data: Header) => {
  // Extract any existing anchor tags from the header variable
  const matches = data.header.match(/<a[^>]*>.*?<\/a>/g);
  const extractedAnchors = matches ? matches.join(' ') : '';

  return extractedAnchors;
};

export const getDataWithoutNestedAnchors = (data: Header, headerTemplate: TemplateExecutor) => {
  // Extract any existing anchor tags from the header variable
  const extractedAnchors = extractAnchorTags(data);

  if (!extractedAnchors) {
    return headerTemplate(data);
  }

  const results = headerTemplate(data);

  // Parse the results to hmtl
  const nodes = parse(results);

  const firstAnchorNode = nodes.querySelector(`a`);

  const parentNode = firstAnchorNode?.parentNode;

  const content = Array.from(firstAnchorNode?.childNodes ?? []);

  //remove content of first anchor node
  firstAnchorNode?.set_content('');

  //insert extracted anchor as first child and rest of the content as siblings
  parentNode?.set_content([firstAnchorNode, ...content]);

  return parentNode?.outerHTML || results;
};
