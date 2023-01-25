// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createPageContent } from "@/hooks/fetch/page/content/createPageContent";

import type { PageContent as PageContentType } from "@/types";

const handleElem = (elem: string) => {
  if (elem === "h1") return "m-2 font-900 text-size-5 leading-7";
  if (elem === "h2") return "m-2 font-700 leading-6";
  if (elem === "h3") return "m-1 font-700 leading-5";
  if (elem === "p") return "p-2 leading-4";
  // setup some logic for this
  if (elem === "ul") return "ul leading-4";
  if (elem === "ol") return "ol leading-4";
  if (elem === "li") return "li leading-4";
};

export default function NewPageContent({
  folder_id,
  page_id,
}: {
  folder_id: string;
  page_id: string;
}) {
  const [content, setContent] = React.useState<PageContentType>(null);

  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (newContent: PageContentType) => {
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
    const newContent: PageContentType = {
      elem: e.target.elem.value,
      text: e.target.text.value,
    };
    createMutation.mutate({ ...newContent });
    setContent(null);
  };

  return (
    <>
      <form pt-1 onSubmit={onSubmit} inline-flex>
        <Label htmlFor="elem" />
        <select
          name="elem"
          border-1
          border-transparent
          rounded
          leading-4
          text-base
          hover:border-neutral-400
          focus:border-neutral-400
          hover:animate-pulse
          focus:animate-pulse
          outline-none
          w-12
          text-center
          relative
          right-2
          onChange={(e) => setContent({ ...content, elem: e.target.value })}
        >
          <option w-12 value="p">
            p
          </option>
          <option value="h1">h1</option>
          <option w-12 value="h2">
            h2
          </option>
          <option w-12 value="h3">
            h3
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
          value={content?.text ?? ""}
          className={content?.elem ? handleElem(content.elem) : ""}
          onChange={(e) => setContent({ ...content, text: e.target.value })}
          name="text"
          placeholder="..."
          title="add line"
        />
      </form>
    </>
  );
}
