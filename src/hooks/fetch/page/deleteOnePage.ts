import { Page } from "@/types";

export async function deleteOnePage(
  page: Page,
  folder_id?: string,
  page_id?: string
) {
  const route =
    folder_id && page_id
      ? `/api/folder/${folder_id}/${page_id}/delete-page`
      : "/api/page/delete-page";
  const response = await fetch(route, {
    body: JSON.stringify(page),
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  return response;
}
