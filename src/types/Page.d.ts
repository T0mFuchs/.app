import { Content } from "./Content";
export type Page = {
  _id?: string;
  title?: string;
  tags?: [{ name: string }];
  content?: [Content];
  iat?: number; // issued at
  eat?: number; // edited at
};
