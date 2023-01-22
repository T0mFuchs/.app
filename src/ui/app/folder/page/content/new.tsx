// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPageContent } from "@/hooks/fetch/page/content/createPageContent";

import type { Content } from "@/types";

// todo :: replace select with radix-ui select

export default function NewPageContent({
  folder_id,
  page_id,
}: {
  folder_id: string;
  page_id: string;
}) {
  const [text, setText] = React.useState<string>(null);
  const [elem, setElem] = React.useState<string>(null);

  //* |define some lofic| useReducer to only allow li after ul or ol

  const [styles, setStyles] = React.useState<string>(null);
  // set string of styles depending on key listener toggle between bold italic underline
  // todo: useReducer to toggle between bold italic underline

  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (newContent: Content) => {
      createPageContent(newContent, folder_id, page_id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["folder"],
        });
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const newContent: Content = {
      elem: e.target.elem.value,
      // @ts-ignore
      text: e.target.text.value,
    };
    createMutation.mutate({ ...newContent });
    setText("");
  };

  return (
    <>
      <form pt-1 onSubmit={onSubmit}>
        <Label htmlFor="elem" />
        <select
          name="elem"
          border-0
          rounded
          leading-4
          text-base
          hover:bg-neutral-800
          focus:bg-neutral-800
          w-12
          text-center
          relative
          right-2
        >
          <option value="h1" bg-transparent>
            h1
          </option>
          <option w-12 value="h2">
            h2
          </option>
          <option w-12 value="h3">
            h3
          </option>
          <option w-12 value="p">
            p
          </option>
          <option w-12 value="ul">
            ul
          </option>
          <option w-12 value="ol">
            ol
          </option>
          <option w-12 value="li">
            li
          </option>
        </select>
        <Label htmlFor="text" />
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
          name="text"
          value={text ? text : undefined}
          onChange={(e) => setText(e.target.value)}
          placeholder=""
        />
      </form>
    </>
  );
}
