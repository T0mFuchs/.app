export async function createPageTag(
  tag: any,
  folder_id: string,
  page_id: string
) {
  const response = await fetch(
    `/api/folder/${folder_id}/${page_id}/tags/create-tag`,
    {
      body: JSON.stringify(tag),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
  return response;
}
