import { Folder } from "@/types";

export async function deleteOneFolder(folder: Folder) {
  const response = await fetch(`/api/folder/deleteOne`, {
    body: JSON.stringify(folder),
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  return response;
}