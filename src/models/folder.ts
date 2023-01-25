import mongoose from "mongoose";
import { pageSchema as page } from "./page";

export const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  tags: [
    {
      name: String,
      color: String,
    },
  ],
  pages: [page],
  iat: {
    type: Number,
    required: true,
  },
  eat: {
    type: Number,
    required: true,
  },
});
