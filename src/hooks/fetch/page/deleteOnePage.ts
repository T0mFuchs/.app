import { Page } from "@/types";

export async function deleteOnePage(page: Page) {
  const response = await fetch("/api/page/deleteOne", {
    body: JSON.stringify(page),
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  return response;
}
