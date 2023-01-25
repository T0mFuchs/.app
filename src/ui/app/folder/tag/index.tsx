// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updateFolderTag } from "@/hooks/fetch/folder/tag/updateFolderTag";
import { deleteFolderTag } from "@/hooks/fetch/folder/tag/deleteFolderTag";

import type { Tag as FolderTag } from "@/types";

export default function FolderTag({
  tag,
  folder_id,
}: {
  tag: FolderTag;
  folder_id?: string;
}) {
  const [currentTag, setCurrentTag] = React.useState<FolderTag>(tag);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    (updatedTag) => updateFolderTag(updatedTag, folder_id, currentTag._id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const deleteMutation = useMutation(
    (tag) => deleteFolderTag(tag, folder_id, currentTag._id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedTag: FolderTag = {
      name: e.target.name.value,
      color: e.target.color.value,
    };
    if (updatedTag.name === "") {
      deleteMutation.mutate({ ...currentTag });
      return;
    }
    if (currentTag?.name !== tag.name || currentTag?.color !== tag.color) {
      updateMutation.mutate({ ...updatedTag });
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
          backgroundColor: currentTag?.color ?? "#000000",
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
