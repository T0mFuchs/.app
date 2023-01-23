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
    };
    createMutation.mutate({ ...newFolder });
    setFolder(null);
  };

  return (
    <div inline-flex>
      <span i-mdi-folder-outline relative top-2 right-1 />
      <form pt-1 onSubmit={onSubmit}>
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
          name="name"
          value={folder?.name ?? ""}
          onChange={(e) => setFolder({ name: e.target.value })}
          placeholder=""
        />
      </form>
    </div>
  );
}
