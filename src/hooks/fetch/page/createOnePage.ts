import { Page } from "@/types";

export async function createOnePage(page: Page, folder_id?: string) {
  const route = folder_id
    ? `/api/folder/${folder_id}/create-page`
    : "/api/page/create-page";
  const response = await fetch(route, {
    body: JSON.stringify(page),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response;
}
