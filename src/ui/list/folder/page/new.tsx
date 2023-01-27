// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { trpc } from "@lib/trpc";

import type { Page } from "@types";

export default function NewPage({ folder_id }: { folder_id: string }) {
  const [page, setPage] = React.useState<Page>(null);

  const createFolderPage = trpc.folderPages.create.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    createFolderPage.mutateAsync({
      folder_id: folder_id,
      title: e.target.title.value,
      color:
        e.target.color.value === "#000000"
          ? "var(--text)"
          : e.target.color.value,
    });
    setPage(null);
  };

  const ref = React.useRef(null);
  const mouseEnter = (e) => {
    ref.current.style.opacity = 1;
  };
  const mouseLeave = (e) => {
    ref.current.style.opacity = 0;
  };

  return (
    <div inline-flex onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <form pt-1 onSubmit={onSubmit}>
        <Label htmlFor="color" />
        <input
          i-mdi-file-outline
          relative
          right="1.5"
          top="-.5"
          outline-none
          type="color"
          name="color"
          value={page?.color ?? "#000000"}
          onChange={(e) => setPage({ ...page, color: e.target.value })}
          style={{
            backgroundColor: page?.color ?? "var(--text)",
            opacity: 0,
          }}
          ref={ref}
        />
        <Label htmlFor="title" />
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
          name="title"
          value={page?.title ?? ""}
          onChange={(e) => setPage({ title: e.target.value })}
          placeholder="..."
          title="add page"
          style={{
            width: `${
              page && page.title?.length > 3 ? page?.title?.length + 1 : 4
            }ch`,
          }}
        />
      </form>
    </div>
  );
}
