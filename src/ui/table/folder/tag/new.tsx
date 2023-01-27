// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { trpc } from "@lib/trpc";

import type { Tag as FolderTag } from "@types";

export default function Content({ folder_id }: { folder_id?: string }) {
  const [tag, setTag] = React.useState<FolderTag | null>(null);

  const createFolderTag = trpc.folderTag.create.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTag: FolderTag = {
      name: e.target.name.value,
      color: e.target.color.value,
    };
    createFolderTag.mutate({ folder_id, ...newTag });
    setTag(null);
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
        left="1.5"
        top="-.3"
        border-0
        rounded
        leading-4
        text-base
        bg-transparent
        hover:bg-neutral-800
        focus:bg-neutral-800
        outline-none
        value={tag?.color ?? "#000000"}
        onChange={(e) => setTag({ ...tag, color: e.target.value })}
        style={{
          backgroundColor: tag?.color ?? "var(--text)",
          opacity: 0,
        }}
        ref={colorRef}
      />
      <span p-1 aria-hidden />
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
        value={tag?.name ?? ""}
        placeholder="+"
        title="add tag"
        onChange={(e) => setTag({ ...tag, name: e.target.value })}
        style={{
          width: `${
            tag?.name ? (tag?.name.length > 3 ? tag?.name.length / 1.9 : 2) : 4
          }rem`,
        }}
      />
    </form>
  );
}
