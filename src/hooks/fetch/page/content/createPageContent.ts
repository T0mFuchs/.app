import { Content } from "@/types";

export async function createPageContent(
  content: Content,
  folder_id: string,
  page_id: string
) {
  const response = await fetch(
    `/api/folder/${folder_id}/${page_id}/create-content`,
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
