// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { PageContext } from "@context/page";
import { trpc } from "@lib/trpc";

import type { Tag as PageTag } from "@types";

export default function PageTag({
  tag,
  folder_id,
  page_id,
  index,
}: {
  tag: PageTag;
  folder_id?: string;
  page_id?: string;
  index: number;
}) {
  const { page: pageContext, setPage: setPageContext } =
    React.useContext(PageContext);

  const updateFolderPageTag = trpc.folderPagesTags.update.useMutation();
  const deleteFolderPageTag = trpc.folderPagesTags.delete.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (pageContext?.tags[index]?.name === "") {
      deleteFolderPageTag.mutate({
        folder_id: folder_id,
        page_id: page_id,
        tag_id: tag._id,
      });
      return null;
    }
    if (
      pageContext?.tags[index]?.name !== tag.name ||
      pageContext?.tags[index]?.color !== tag.color
    ) {
      updateFolderPageTag.mutate({
        folder_id: folder_id,
        page_id: page_id,
        tags: pageContext?.tags,
      });
      return null;
    }
  };

  return (
    <form pt-1 onSubmit={onSubmit}>
      <Label htmlFor="color" />
      <input
        type="color"
        name="color"
        m-0
        p-1
        i-mdi-dots-circle
        relative
        right-1
        top="-.3"
        border-0
        rounded
        leading-4
        text-base
        bg-transparent
        hover:bg-neutral-800
        focus:bg-neutral-800
        outline-none
        value={pageContext ? pageContext?.tags[index]?.color : tag.color}
        onChange={(e) => {
          setPageContext({
            ...pageContext,
            tags: [
              ...pageContext.tags.map((t, i) => {
                if (i === index) {
                  return {
                    name: pageContext?.tags[i]?.name,
                    color: e.target.value,
                    _id: pageContext?.tags[i]?._id,
                  };
                }
                return t;
              }),
            ],
          });
        }}
        style={{
          backgroundColor: pageContext
            ? pageContext?.tags[index]?.color
            : "var(--text)",
          fill: pageContext ? pageContext?.tags[index]?.color : "var(--text)",
        }}
      />
      <Label htmlFor="name" />
      <input
        type="text"
        name="name"
        m-0
        p-1
        border-0
        rounded
        leading-4
        text-base
        text-center
        bg-transparent
        hover:bg-neutral-800
        focus:bg-neutral-800
        outline-none
        value={pageContext ? pageContext?.tags[index]?.name : tag.name}
        onChange={(e) => {
          setPageContext({
            ...pageContext,
            tags: [
              ...pageContext.tags.map((t, i) => {
                if (i === index) {
                  return {
                    name: e.target.value,
                    color: pageContext?.tags[i]?.color,
                    _id: pageContext?.tags[i]?._id,
                  };
                } else return t;
              }),
            ],
          });
        }}
        style={{
          width: `${
            pageContext && pageContext.tags[index]?.name.length > 3
              ? pageContext.tags[index]?.name.length + 1
              : 4
          }ch`,
          backgroundColor: pageContext
            ? pageContext?.tags[index]?.color
            : tag.color,
        }}
      />
    </form>
  );
}
