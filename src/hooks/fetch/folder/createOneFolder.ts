import { Folder } from "@/types";

export async function createOneFolder(folder: Folder) {
  const response = await fetch("/api/folder/createOne", {
    body: JSON.stringify(folder),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response;
}
