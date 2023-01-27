// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { trpc } from "@lib/trpc";

import type { Tag as PageTag } from "@types";

export default function PageTag({
  tag,
  folder_id,
  page_id,
}: {
  tag: PageTag;
  folder_id?: string;
  page_id?: string;
}) {
  const [currentTag, setCurrentTag] = React.useState<PageTag>(tag);

  const updateFolderPageTag = trpc.folderPagesTags.update.useMutation();
  const deleteFolderPageTag = trpc.folderPagesTags.delete.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedTag: PageTag = {
      name: e.target.name.value,
      color: e.target.color.value,
    };
    if (updatedTag.name === "") {
      deleteFolderPageTag.mutate({
        folder_id: folder_id,
        page_id: page_id,
        tag_id: tag._id,
      });
      return;
    }
    if (currentTag?.name !== tag.name || currentTag?.color !== tag.color) {
      updateFolderPageTag.mutate({
        folder_id: folder_id,
        page_id: page_id,
        tag_id: tag._id,
        tag: updatedTag,
      });
      return;
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
        value={currentTag?.color}
        onChange={(e) =>
          setCurrentTag({ ...currentTag, color: e.target.value })
        }
        style={{
          backgroundColor: currentTag?.color ?? "var(--text)",
          fill: currentTag?.color ?? "var(--text)",
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
        bg-transparent
        hover:bg-neutral-800
        focus:bg-neutral-800
        outline-none
        value={currentTag?.name}
        onChange={(e) => setCurrentTag({ ...currentTag, name: e.target.value })}
        style={{
          width: `${currentTag?.name.length / 1.5}rem`,
          backgroundColor: currentTag?.color,
        }}
      />
    </form>
  );
}
