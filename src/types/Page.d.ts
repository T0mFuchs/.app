export type Page = {
  _id?: string;
  title?: string;
  tags?: [{ name: string }];
  content?: [{ elem: string; text: string }];
  iat?: number; // issued at
  eat?: number; // edited at
};
