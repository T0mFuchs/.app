// @ts-nocheck
import React from "react";
import { Separator } from "@radix-ui/react-separator";

import { PageContext } from "@context/page";

import type { Page } from "@types";

const features = import("@features/framer-motion/domMax").then(
  (res) => res.default
);

export default function PageModal({
  page,
  folder_id,
}: {
  page: Page | undefined;
  folder_id?: string;
}) {
  const {
    page: pageContext,
    setPage: setPageContext,
    folder: folderContext,
    setFolder: setFolderContext,
  } = React.useContext(PageContext);

  return (
    <>
      <div p-4 pt-6 pl-6>
        <div aria-hidden z--1 fixed className="o s" />
        <button
          i-mdi-close
          relative
          top-1
          left="-3.5"
          bg-red
          onClick={() => setPageContext(null)}
        />
        <div>
          <span i-mdi-link relative top="-.5" mr-1 />
          {page._id}
          <span i-mdi-chevron-double-right relative top="-.5" mr-1 />
          {folder_id}
        </div>
        <Separator
          absolute
          h="1px"
          w-full
          bg-neutral-800
          orientation="horizontal"
        />
        <Separator
          absolute
          w="1px"
          h="100vmax"
          bg-neutral-800
          orientation="vertical"
        />
        <div>
          <h2>{page.title}</h2>
          <div></div>
        </div>
        <div></div>
      </div>
    </>
  );
}
