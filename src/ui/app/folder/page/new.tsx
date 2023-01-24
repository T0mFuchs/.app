// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createOnePage } from "@/hooks/fetch/page/createOnePage";
import type { Page } from "@/types";

export default function NewPage({ folder_id }: { folder_id: string }) {
  const [page, setPage] = React.useState<Page>(null);

  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (newPage: Page) => createOnePage(newPage, folder_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const newPage: Page = {
      // @ts-ignore
      title: e.target.title.value,
    };
    createMutation.mutate({ ...newPage });
    setPage(null);
  };

  return (
    <div inline-flex>
      <span i-mdi-file-outline relative top-2 right-1 />
      <form pt-1 onSubmit={onSubmit}>
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
        />
      </form>
    </div>
  );
}
