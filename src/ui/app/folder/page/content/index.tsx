// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updatePageContent } from "@/hooks/fetch/page/content/updatePageContent";
import { deletePageContent } from "@/hooks/fetch/page/content/deletePageContent";

import type { Content as ContentType } from "@/types";

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

export default function Content({
  content,
  folder_id,
  page_id,
  key,
}: {
  content: ContentType;
  folder_id?: string;
  page_id?: string;
  key?: React.Key;
}) {
  const [currentContent, setCurrentContent] =
    React.useState<ContentType>(content);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    (updatedContent: ContentType) =>
      updatePageContent(updatedContent, folder_id, page_id, currentContent._id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const deleteMutation = useMutation(
    (content: ContentType) =>
      deletePageContent(content, folder_id, page_id, currentContent._id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedContent: ContentType = {
      elem: e.target.elem.value,
      text: e.target.text.value,
    };
    if (updatedContent.text === "") {
      deleteMutation.mutate({ ...currentContent });
      return;
    }
    if (currentContent?.text !== content.text) {
      updateMutation.mutate({ ...updatedContent });
      return;
    }
  };

  //! todo: add select field but make them opacity 0 and only set them to 1 on hover & focus

  return (
    <form pt-1 onSubmit={onSubmit}>
      <Label htmlFor="elem" />
      <select
        name="elem"
        defaultValue={content.elem}
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
        onChange={(e) =>
          setCurrentContent({ ...currentContent, elem: e.target.value })
        }
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
        key={key}
        value={currentContent?.text}
        className={handleElem(currentContent.elem)}
        onChange={(e) =>
          setCurrentContent({ ...currentContent, text: e.target.value })
        }
        name="text"
      />
    </form>
  );
}
