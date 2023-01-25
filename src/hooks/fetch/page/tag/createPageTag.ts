import type { Tag } from "@/types";

export async function createPageTag(
  tag: Tag,
  folder_id: string,
  page_id: string
) {
  const response = await fetch(
    `/api/folder/${folder_id}/pages/${page_id}/tags/create-tag`,
    {
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
  return response;
}
