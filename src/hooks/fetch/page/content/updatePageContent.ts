import { PageContent } from "@/types";

export async function updatePageContent(
  content: PageContent,
  folder_id: string,
  page_id: string,
  content_id: string
) {
  const response = await fetch(
    `/api/folder/${folder_id}/${page_id}/content/${content_id}/update-content`,
    {
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }
  );
  return response;
}
