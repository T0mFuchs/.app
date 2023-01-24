// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createPageTag } from "@/hooks/fetch/page/tag/createPageTag";

import type { PageTag } from "@/types";

export default function Content({
  folder_id,
  page_id,
  key,
}: {
  folder_id?: string;
  page_id?: string;
  key?: React.Key;
}) {
  const [tag, setTag] = React.useState<PageTag>(null);

  const queryClient = useQueryClient();

  const createMutation = useMutation(
    (tag) => createPageTag(tag, folder_id, page_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedTag: PageTag = {
      name: e.target.name.value,
      color: e.target.color.value,
    };
    createMutation.mutate({ ...updatedTag });
    setTag(null);
  };

  //! todo: add select field but make them opacity 0 and only set them to 1 on hover & focus

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
        value={tag?.color ?? "#000000"}
        onChange={(e) => setTag({ ...tag, color: e.target.value })}
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
        value={tag?.name ?? ""}
        placeholder="new tag"
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
