// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updatePageTag } from "@/hooks/fetch/page/tag/updatePageTag";
import { deletePageTag } from "@/hooks/fetch/page/tag/deletePageTag";

import type { PageTag } from "@/types";

export default function PageTag({
  tag,
  folder_id,
  page_id,
  key,
}: {
  tag: PageTag;
  folder_id?: string;
  page_id?: string;
  key?: React.Key;
}) {
  const [currentTag, setCurrentTag] = React.useState<PageTag>(tag);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    (updatedTag) =>
      updatePageTag(updatedTag, folder_id, page_id, currentTag._id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const deleteMutation = useMutation(
    (tag) => deletePageTag(tag, folder_id, page_id, currentTag._id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedTag = {
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
        w-6
        h-6
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
      />
      <Label htmlFor="name" />
      <input
        type="text"
        name="name"
        m-0
        p-1
        w-self
        border-0
        rounded
        leading-4
        text-base
        bg-transparent
        hover:bg-neutral-800
        focus:bg-neutral-800
        outline-none
        key={key}
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
