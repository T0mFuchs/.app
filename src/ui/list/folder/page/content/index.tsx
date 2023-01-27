// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { trpc } from "@lib/trpc";

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

export default function PageContent({
  content,
  folder_id,
  page_id,
}: {
  content: PageContentType;
  folder_id?: string;
  page_id?: string;
}) {
  const [currentContent, setCurrentContent] =
    React.useState<PageContentType>(content);

  const updateFolderPageContent = trpc.folderPagesContent.update.useMutation();

  const deleteFolderPageContent = trpc.folderPagesContent.delete.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedContent: PageContentType = {
      elem: e.target.elem.value,
      text: e.target.text.value,
    };
    if (updatedContent.text === "") {
      deleteFolderPageContent.mutate({
        folder_id: folder_id,
        page_id: page_id,
        content_id: content._id,
      });
      return;
    }
    if (
      currentContent?.text !== content.text ||
      currentContent?.elem !== content.elem
    ) {
      updateFolderPageContent.mutate({
        folder_id: folder_id,
        page_id: page_id,
        content_id: content._id,
        content: updatedContent,
      });
      return;
    }
  };

  return (
    <>
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
          value={currentContent?.text}
          className={handleElem(currentContent.elem)}
          onChange={(e) =>
            setCurrentContent({ ...currentContent, text: e.target.value })
          }
          name="text"
          type="text"
        />
      </form>
      <Separator w="95%" bg-neutral h="1px" mt-1 />
    </>
  );
}
