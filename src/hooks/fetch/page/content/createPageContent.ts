import { PageContent } from "@/types";

export async function createPageContent(
  content: PageContent,
  folder_id: string,
  page_id: string
) {
  const response = await fetch(
    `/api/folder/${folder_id}/${page_id}/content/create-content`,
    {
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
  return response;
}
