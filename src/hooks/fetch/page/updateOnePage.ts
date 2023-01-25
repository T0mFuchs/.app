import { Page } from "@/types";

export async function updateOnePage(
  page: Page,
  folder_id?: string,
  page_id?: string
) {
  const route =
    folder_id && page_id
      ? `/api/folder/${folder_id}/pages/${page_id}/update-page`
      : "/api/page/delete-page";
  const response = await fetch(route, {
    body: JSON.stringify(page),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  return response;
}
