import { Content } from "@/types";

export async function deletePageContent(
  content: Content,
  folder_id: string,
  page_id: string,
  content_id: string
) {
  const response = await fetch(
    `/api/folder/${folder_id}/${page_id}/${content_id}/delete-content`,
    {
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  );
  return response;
}
