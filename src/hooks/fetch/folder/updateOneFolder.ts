import { Folder } from "@/types";

export async function updateOneFolder(folder: Folder) {
  const response = await fetch(`/api/folder/updateOne`, {
    body: JSON.stringify(folder),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  return response;
}
