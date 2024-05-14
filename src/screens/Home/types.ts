export interface Category {
  name: string;
  label: string;
}

export interface Tag {
  name: string;
  label: string;
}

export interface Industries {
  name: string;
  label: string;
}

export interface Days {
  name: string;
  label: string;
}

export interface Categories {
  [key: string]: Category[];
}

export interface Tags {
  [key: string]: Tag[];
}
