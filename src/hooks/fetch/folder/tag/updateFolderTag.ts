import type { Tag } from "@/types";

export async function updateFolderTag(
  tag: Tag,
  folder_id: string,
  page_id: string,
  tag_id: string
) {
  const response = await fetch(
    `/api/folder/${folder_id}/tags/${tag_id}/update-tag`,
    {
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }
  );
  return response;
}
