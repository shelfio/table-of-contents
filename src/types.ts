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
  attrs: any;
  header: any;
  text: string;
  anchor: any;
  all: any;
};
