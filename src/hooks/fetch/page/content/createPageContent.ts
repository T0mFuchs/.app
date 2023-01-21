import { Content } from "@/types";

export async function createPageContent(content: Content, _id: string, index: number) {
  const response = await fetch(`/api/folder/${_id}/${index}/updateOnePage`, {
    body: JSON.stringify(content),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  return response;
}
