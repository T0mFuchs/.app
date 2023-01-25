import type { Tag } from "@/types";

export async function createFolderTag(tag: Tag, folder_id: string) {
  const response = await fetch(`/api/folder/${folder_id}/create-tag`, {
    body: JSON.stringify(tag),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response;
}
