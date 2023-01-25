import type { Tag } from "@/types";

export async function deletePageTag(
  tag: Tag,
  folder_id: string,
  page_id: string,
  tag_id: string
) {
  const response = await fetch(
    `/api/folder/${folder_id}/pages/${page_id}/tags/${tag_id}/delete-tag`,
    {
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  );
  return response;
}