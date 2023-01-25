import { Tag } from "./Tag";

export type Page = {
  _id?: string;
  title?: string;
  color?: string;
  tags?: [Tag];
  content?: [PageContent];
  iat?: number; // issued at
  eat?: number; // edited at
};

export type PageContent = {
  _id?: string;
  elem?: string;
  text?: string;
};
