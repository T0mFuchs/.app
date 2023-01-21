import mongoose from "mongoose";
import { folderSchema } from "./folder";
import { pageSchema } from "./page";

export const folder =
  mongoose.models.folder || mongoose.model("folder", folderSchema);
export const page = mongoose.models.page || mongoose.model("page", pageSchema);
