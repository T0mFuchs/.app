import { Page } from "@/types";

export async function updateOnePage(page: Page, _id?: string, index?: number) {
  const route = _id
    ? `/api/folder/${_id}/${index}/updateOnePage`
    : "/api/page/updateOne";
  const response = await fetch(route, {
    body: JSON.stringify(page),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  return response;
}
