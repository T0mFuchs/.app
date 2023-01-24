import { PageContent } from "@/types";

export async function deletePageContent(
  content: PageContent,
  folder_id: string,
  page_id: string,
  content_id: string
) {
  const response = await fetch(
    `/api/folder/${folder_id}/${page_id}/content/${content_id}/delete-content`,
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
