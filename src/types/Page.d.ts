export type Page = {
  _id?: string;
  title?: string;
  tags?: [{ name: string }];
  content?: [PageContent];
  iat?: number; // issued at
  eat?: number; // edited at
};

export type PageTag = {
  _id?: string;
  name?: string;
  color?: string;
};

export type PageContent = {
  _id?: string;
  elem?: string;
  text?: string;
};
