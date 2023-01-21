import { Page } from "@/types";

export async function createOnePage(page: Page, _id?: string) {
  const route = _id
    ? `/api/folder/${_id}/createOnePage`
    : "/api/page/createOne";
  const response = await fetch(route, {
    body: JSON.stringify(page),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response;
}
