import mongoose from "mongoose";
import { pageSchema as page } from "./page";

export const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pages: [page],
  iat: {
    type: Number,
  },
  eat: {
    type: Number,
  },
});
