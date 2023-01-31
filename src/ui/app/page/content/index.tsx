// @ts-nocheck
import React from "react";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { PageContext } from "@context/page";
import { trpc } from "@lib/trpc";

import type { PageContent as PageContentType } from "@/types";

const handleElem = (elem: string) => {
  if (elem === "h1") return "m-2 font-900 text-size-5 leading-7";
  if (elem === "h2") return "m-2 font-700 leading-6";
  if (elem === "h3") return "m-1 font-700 leading-5";
  if (elem === "p") return "p-2 leading-4";
};

export default function PageContent({
  content,
  folder_id,
  page_id,
  index,
}: {
  content: PageContentType;
  folder_id?: string;
  page_id?: string;
  index: number;
}) {
  const { page: pageContext, setPage: setPageContext } =
    React.useContext(PageContext);

  const updateFolderPageContent = trpc.folderPagesContent.update.useMutation();
  const deleteFolderPageContent = trpc.folderPagesContent.delete.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (pageContext?.content[index]?.text === "") {
      deleteFolderPageContent.mutate({
        folder_id: folder_id,
        page_id: page_id,
        content_id: content._id,
      });
      return null;
    }
    if (
      pageContext?.content[index]?.text !== content.text ||
      pageContext?.content[index]?.elem !== content.elem
    ) {
      updateFolderPageContent.mutate({
        folder_id: folder_id,
        page_id: page_id,
        content: pageContext?.content,
      });
      setPageContext({ ...pageContext, content: pageContext?.content });
      return null;
    }
  };

  const ref = React.useRef(null);
  const mouseEnter = (e) => {
    ref.current.style.opacity = 1;
  };
  const mouseLeave = (e) => {
    ref.current.style.opacity = 0;
  };

  return (
    <>
      <form
        pt-1
        onSubmit={onSubmit}
        onPointerEnter={mouseEnter}
        onPointerLeave={mouseLeave}
        onFocus={mouseEnter}
        onBlur={mouseLeave}
      >
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
          value={
            pageContext && pageContext.content[index]?._id === content._id
              ? pageContext?.tags[index]?.elem
              : content.elem
          }
          onChange={(e) => {
            setPageContext({
              ...pageContext,
              content: [
                ...pageContext.content.map((x, i) => {
                  if (i === index) {
                    return {
                      elem: e.target.value,
                      text: pageContext.content[index].text,
                      _id: content._id,
                    };
                  } else return x;
                }),
              ],
            });
          }}
          style={{ opacity: 0 }}
          ref={ref}
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
          value={
            pageContext && pageContext.content[index]?._id === content._id
              ? pageContext?.content[index]?.text
              : content.text
          }
          className={handleElem(
            pageContext ? pageContext.content[index]?.elem : content.elem
          )}
          onChange={(e) => {
            setPageContext({
              ...pageContext,
              content: [
                ...pageContext.content.map((x, i) => {
                  if (i === index) {
                    return {
                      elem: pageContext.content[index].elem,
                      text: e.target.value,
                      _id: content._id,
                    };
                  } else return x;
                }),
              ],
            });
          }}
          style={{
            width: `${
              pageContext && pageContext.content[index]?.text.length > 3
                ? pageContext.content[index]?.text.length + 1
                : 4
            }ch`,
          }}
          name="text"
          type="text"
        />
      </form>
      <Separator w-full bg-neutral-800 h="1px" mb-1 mt="1.5" />
    </>
  );
}