// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createOneFolder } from "@/hooks/fetch/folder/createOneFolder";

import type { Folder } from "@/types";

export default function New() {
  const [folder, setFolder] = React.useState<Folder>(null);

  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (newFolder: Folder) => createOneFolder(newFolder),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const newFolder: Folder = {
      name: e.target.name.value,
      color: e.target.color.value,
      
    };
    createMutation.mutate({ ...newFolder });
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
          value={folder?.color ?? "var(--text)"}
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
        />
      </form>
    </div>
  );
}
