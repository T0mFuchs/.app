// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createOnePage } from "@/hooks/fetch/page/createOnePage";
import type { Page } from "@/types";

export default function NewPage({ folder_id }: { folder_id: string }) {
  const [title, setTitle] = React.useState<string>(null);

  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (newPage: Page) => createOnePage(newPage, folder_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["page", "folder"] });
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
    setTimeout(() => setTitle(""), 50);
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
          name="title"
          value={title ? title : undefined}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=""
        />
      </form>
    </div>
  );
}
