// @ts-nocheck
import React from "react";
import { PageContext } from "@context/page";
import type { Page } from "@types";

export default function PageModal({
  page,
  folder_id,
}: {
  page: Page;
  folder_id?: string;
}) {
  const {
    page: pageContext,
    setPage: setPageContext,
    folder: folderContext,
    setFolder: setFolderContext,
  } = React.useContext(PageContext);

  return (
    <div p-4 pt-8 pl-8>
      <button i-mdi-close bg-red onClick={() => setPageContext(null)} />
      <div>{page.title}</div>
      <div>{page._id}</div>
      <div>{folder_id}</div>
    </div>
  );
}
