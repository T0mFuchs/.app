// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createPageTag } from "@/hooks/fetch/page/tag/createPageTag";

import type { Tag as PageTag } from "@/types";

export default function Content({
  folder_id,
  page_id,
}: {
  folder_id?: string;
  page_id?: string;
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

  const ref = React.useRef(null);
  const mouseEnter = (e) => {
    ref.current.style.opacity = 1;
  };
  const mouseLeave = (e) => {
    ref.current.style.opacity = 0;
  };

  return (
    <form
      pt-1
      onSubmit={onSubmit}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
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
        ref={ref}
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
        onChange={(e) => setTag({ ...tag, name: e.target.value })}
        style={{
          width: `${
            tag?.name ? (tag?.name.length > 3 ? tag?.name.length / 1.9 : 2) : 4
          }rem`,
        }}
        placeholder="+"
        title="add tag"
      />
    </form>
  );
}
