import type {TemplateExecutor} from 'lodash';
import type {Header} from '../types.js';

const parser = new DOMParser();

const hasAnchorTagsInHeader = (data: Header) => {
  const doc = parser.parseFromString(data.header, 'text/xml');

  // Extract any existing anchor tags from the header variable
  const anchorElement = doc.querySelector('a');

  return anchorElement?.outerHTML;
};

export const getDataWithoutNestedAnchors = (data: Header, headerTemplate: TemplateExecutor) => {
  const results = headerTemplate(data);

  if (!hasAnchorTagsInHeader(data)) {
    return headerTemplate(data);
  }

  const doc = parser.parseFromString(results, 'text/xml');

  // get Toc pointer anchor node
  const firstAnchorElement = doc.querySelector(`a[href="#${data.anchor}"]`);

  // get all content nodes from Toc pointer anchor node
  const contentArray = Array.from(firstAnchorElement?.childNodes ?? []);

  const parentNode = firstAnchorElement?.parentElement;

  // remove all content nodes from Toc pointer anchor node
  contentArray.forEach(node => {
    firstAnchorElement?.removeChild(node);
  });

  if (firstAnchorElement) {
    firstAnchorElement.innerHTML = '<wbr/>';
  }

  const newContentArray = [firstAnchorElement, ...contentArray] as Node[];

  parentNode?.replaceChildren(...newContentArray);

  return parentNode?.outerHTML || results;
};
