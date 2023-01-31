// @ts-nocheck
import React from "react";
import * as Select from "@radix-ui/react-select";
import { Label } from "@radix-ui/react-label";
import { trpc } from "@lib/trpc";

import type { PageContent as PageContentType } from "@types";

const handleElem = (elem: string) => {
  if (elem === "h1") return "m-2 font-900 text-size-5 leading-7";
  if (elem === "h2") return "m-2 font-700 leading-6";
  if (elem === "h3") return "m-1 font-700 leading-5";
  if (elem === "p") return "p-2 leading-4";
};

export default function NewPageContent({
  folder_id,
  page_id,
}: {
  folder_id: string;
  page_id: string;
}) {
  const [content, setContent] = React.useState<PageContentType>(null);

  const createFolderPageContent = trpc.folderPagesContent.create.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newContent: PageContentType = {
      elem: content?.elem ?? "p",
      text: e.target.text.value,
    };
    createFolderPageContent.mutate({
      folder_id: folder_id,
      page_id: page_id,
      content: newContent,
    });
    setContent(null);
  };
  const ref = React.useRef<>(null);

  const showPlaceholder = (evt) => {
    if (content?.text === "") {
      ref.current.placeholder = "type `/` for options";
      ref.current.style.width = "20ch";
    }
  };
  const hidePlaceholder = (evt) => {
    ref.current.placeholder = "";
    ref.current.style.width = `${
      content && content.text.length > 1 ? content.text.length + 1 : 2
    }ch`;
  };

  return (
    <>
      <form
        pt-1
        onSubmit={onSubmit}
        onPointerEnter={showPlaceholder}
        onPointerLeave={hidePlaceholder}
        onFocus={showPlaceholder}
        onBlur={hidePlaceholder}
      >
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
          style={{
            width: `${
              content && content.text?.length > 1
                ? content?.text?.length + 1
                : 2
            }ch`,
          }}
          ref={ref}
          name="text"
          title="add line"
        />
        {content && content.text === "/" ? (
          <Select.Root open={content.text === "/"}>
            <Select.Content>
              <Select.Viewport
                relative
                bg-neutral-800
                w-full
                p-1
                rounded
                text-center
              >
                <Select.Group>
                  <Select.Item
                    p-1
                    tabIndex={0}
                    autoFocus={content.elem === "p"}
                    onClick={() => {
                      setContent({
                        elem: "p",
                        text: "",
                      });
                    }}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        setContent({
                          elem: "p",
                          text: "",
                        });
                      }
                    }}
                  >
                    <Select.ItemText>p</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    p-1
                    tabIndex={0}
                    autoFocus={content.elem === "h1"}
                    onClick={() => {
                      setContent({
                        elem: "h1",
                        text: "",
                      });
                    }}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        setContent({
                          elem: "h1",
                          text: "",
                        });
                      }
                    }}
                  >
                    <Select.ItemText>h1</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    p-1
                    tabIndex={0}
                    autoFocus={content.elem === "h2"}
                    onClick={() => {
                      setContent({
                        elem: "h2",
                        text: "",
                      });
                    }}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        setContent({
                          elem: "h2",
                          text: "",
                        });
                      }
                    }}
                  >
                    <Select.ItemText>h2</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    p-1
                    tabIndex={0}
                    autoFocus={content.elem === "h3"}
                    onClick={() => {
                      setContent({
                        elem: "h3",
                        text: "",
                      });
                    }}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        setContent({
                          elem: "h3",
                          text: "",
                        });
                      }
                    }}
                  >
                    <Select.ItemText>h3</Select.ItemText>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        ) : null}
      </form>
    </>
  );
}
