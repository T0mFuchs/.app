import { Tag } from "./Tag";
import { Page } from "./Page";

export type Folder = {
  _id?: string;
  name: string;
  color: string;
  tags?: [Tag];
  pages?: [Page];
  iat?: number; // issued at
  eat?: number; // edited at
};
