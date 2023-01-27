// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { trpc } from "@lib/trpc";

import type { Tag as FolderTag } from "@types";

export default function FolderTag({
  tag,
  folder_id,
}: {
  tag: FolderTag;
  folder_id?: string;
}) {
  const [currentTag, setCurrentTag] = React.useState<FolderTag>(tag);

  const updateFolderTag = trpc.folderTags.update.useMutation();
  const deleteFolderTag = trpc.folderTags.delete.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedTag: FolderTag = {
      name: e.target.name.value,
      color: e.target.color.value,
    };
    if (updatedTag.name === "") {
      deleteFolderTag.mutate({ folder_id: folder_id, tag_id: tag._id });
      return;
    }
    if (currentTag?.name !== tag.name || currentTag?.color !== tag.color) {
      updateFolderTag.mutate({
        folder_id: folder_id,
        tag_id: tag._id,
        ...updatedTag,
      });
      return;
    }
  };

  const colorRef = React.useRef(null);
  const formRef = React.useRef(null);
  useOnClickOutside(formRef, () => (colorRef.current.style.opacity = 0));
  const mouseEnter = (e) => {
    colorRef.current.style.opacity = 1;
  };
  const mouseLeave = (e) => {
    colorRef.current.style.opacity = 0;
  };

  return (
    <form
      pt-1
      pl="2.5"
      relative
      top--2
      onSubmit={onSubmit}
      onMouseEnter={mouseEnter}
      onMouseDown={mouseEnter}
      onMouseLeave={mouseLeave}
      ref={formRef}
    >
      <Label htmlFor="color" />
      <input
        type="color"
        name="color"
        m-0
        p-1
        i-mdi-dots-circle
        relative
        right-1
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
          backgroundColor: currentTag?.color ?? "#000000",
          opacity: 0,
        }}
        ref={colorRef}
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
