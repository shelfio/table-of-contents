export type Settings = {
  placeholder: RegExp;
  headers: RegExp;
  tocMin: number;
  tocMax: number;
  anchorMin: number;
  anchorMax: number;
  header: string;
  openUL: string;
  closeUL: string;
  openLI: string;
  closeLI: string;
  TOC: string;
};

export type Header = {
  level: number;
  depth?: number;
  attrs: string;
  header: string;
  text: string;
  anchor: string;
  all: string;
};
