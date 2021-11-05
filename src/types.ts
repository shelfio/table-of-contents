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

export type TOC = {
  untag: (str: string) => string;
  anchor: (str: string) => string;
  unique: (names: Record<string, unknown>, name: string) => string;
  process: (src: any, options?: any) => any;
  anchorize: (src: any, options?: any) => {src: string; html: string; headers: Header[]};
  toc: (headers: Header[], options?: any) => any;
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
