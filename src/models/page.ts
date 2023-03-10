import mongoose from "mongoose";

export const pageSchema = new mongoose.Schema({
  title: {
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
  content: [
    {
      elem: String,
      text: String,
    },
  ],
  iat: {
    type: Number,
    required: true,
  },
  eat: {
    type: Number,
    required: true,
  },
});
