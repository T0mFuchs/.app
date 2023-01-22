import { Page } from "./Page";
export type Folder = {
  _id?: string;
  name: string;
  pages?: [Page];
  iat?: number; // issued at
  eat?: number; // edited at
};
