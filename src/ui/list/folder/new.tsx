// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { trpc } from "@lib/trpc";

import type { Folder } from "@types";

export default function New() {
  const [folder, setFolder] = React.useState<Folder>(null);

  const createFolder = trpc.folder.create.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newFolder: Folder = {
      name: e.target.name.value,
      color:
        e.target.color.value === "#000000"
          ? "var(--text)"
          : e.target.color.value,
    };
    createFolder.mutate({ ...newFolder });
    setFolder(null);
  };

  const ref = React.useRef(null);
  const mouseEnter = (e) => {
    ref.current.style.opacity = 1;
  };
  const mouseLeave = (e) => {
    ref.current.style.opacity = 0;
  };

  return (
    <div
      inline-flex
      relative
      left-1
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <form pt-1 onSubmit={onSubmit}>
        <Label htmlFor="color" />
        <input
          i-mdi-folder-outline
          relative
          right="1.5"
          top="-.5"
          type="color"
          name="color"
          value={folder?.color ?? "#000000"}
          onChange={(e) => setFolder({ ...folder, color: e.target.value })}
          style={{
            backgroundColor: folder?.color ?? "var(--text)",
            opacity: 0,
          }}
          ref={ref}
        />
        <Label htmlFor="name" />
        <input
          type="text"
          p-1
          border-0
          rounded
          leading-4
          text-base
          bg-transparent
          hover:bg-neutral-800
          focus:bg-neutral-800
          outline-none
          name="name"
          value={folder?.name ?? ""}
          onChange={(e) => setFolder({ ...folder, name: e.target.value })}
          placeholder="..."
          title="add folder"
          style={{
            width: `${
              folder && folder.name?.length > 3 ? folder?.name?.length + 1 : 4
            }ch`,
          }}
        />
      </form>
    </div>
  );
}
