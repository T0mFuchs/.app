import { Page } from "./Page";
export type Folder = {
  // required
  _id?: string;
  name: string;
  iat?: number; // issued at
  eat?: number; // edited at
  pages?: [Page];
};
