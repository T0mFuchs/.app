// @ts-nocheck
import React from "react";
import * as Select from "@radix-ui/react-select";
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
    
  const [openSelect, setOpenSelect] = React.useState(false);

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

    updateFolderPageContent.mutate({
      folder_id: folder_id,
      page_id: page_id,
      content: pageContext?.content,
    });
  };

  const ref = React.useRef<>(null);

  const showPlaceholder = (evt) => {
    if (pageContext?.content[index]?.text === "") {
      ref.current.placeholder = "type `/` for options";
      ref.current.style.width = "20ch";
    }
  };
  const hidePlaceholder = (evt) => {
    ref.current.placeholder = "";
    ref.current.style.width = `${
      pageContext && pageContext.content[index]?.text.length > 1
        ? pageContext.content[index]?.text.length + 1
        : content.text.length + 1
    }ch`;
  };

  if (!content) return null;
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
            if (e.target.value === "/") {
              setOpenSelect(true);
            }
          }}
          style={{
            width: `${
              pageContext && pageContext.content[index]?.text.length > 1
                ? pageContext.content[index]?.text.length + 1
                : content.text.length + 1
            }ch`,
          }}
          ref={ref}
          name="text"
          type="text"
        />
        {openSelect ? (
          <Select.Root open={openSelect} onOpenChange={setOpenSelect}>
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
                    autoFocus={pageContext.content[index]?.elem === "p"}
                    onClick={() => {
                      setPageContext({
                        ...pageContext,
                        content: [
                          ...pageContext.content.map((x, i) => {
                            if (i === index) {
                              return {
                                elem: "p",
                                text: "",
                                _id: content._id,
                              };
                            } else return x;
                          }),
                        ],
                      });
                    }}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        setPageContext({
                          ...pageContext,
                          content: [
                            ...pageContext.content.map((x, i) => {
                              if (i === index) {
                                return {
                                  elem: "p",
                                  text: "",
                                  _id: content._id,
                                };
                              } else return x;
                            }),
                          ],
                        });
                      }
                    }}
                  >
                    <Select.ItemText>p</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    p-1
                    tabIndex={0}
                    autoFocus={pageContext.content[index]?.elem === "h1"}
                    onClick={() => {
                      setPageContext({
                        ...pageContext,
                        content: [
                          ...pageContext.content.map((x, i) => {
                            if (i === index) {
                              return {
                                elem: "h1",
                                text: "",
                                _id: content._id,
                              };
                            } else return x;
                          }),
                        ],
                      });
                    }}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        setPageContext({
                          ...pageContext,
                          content: [
                            ...pageContext.content.map((x, i) => {
                              if (i === index) {
                                return {
                                  elem: "h1",
                                  text: "",
                                  _id: content._id,
                                };
                              } else return x;
                            }),
                          ],
                        });
                      }
                    }}
                  >
                    <Select.ItemText>h1</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    p-1
                    tabIndex={0}
                    autoFocus={pageContext.content[index]?.elem === "h2"}
                    onClick={() => {
                      setPageContext({
                        ...pageContext,
                        content: [
                          ...pageContext.content.map((x, i) => {
                            if (i === index) {
                              return {
                                elem: "h2",
                                text: "",
                                _id: content._id,
                              };
                            } else return x;
                          }),
                        ],
                      });
                    }}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        setPageContext({
                          ...pageContext,
                          content: [
                            ...pageContext.content.map((x, i) => {
                              if (i === index) {
                                return {
                                  elem: "h2",
                                  text: "",
                                  _id: content._id,
                                };
                              } else return x;
                            }),
                          ],
                        });
                      }
                    }}
                  >
                    <Select.ItemText>h2</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    p-1
                    tabIndex={0}
                    autoFocus={pageContext.content[index]?.elem === "h3"}
                    onClick={() => {
                      setPageContext({
                        ...pageContext,
                        content: [
                          ...pageContext.content.map((x, i) => {
                            if (i === index) {
                              return {
                                elem: "h3",
                                text: "",
                                _id: content._id,
                              };
                            } else return x;
                          }),
                        ],
                      });
                    }}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter") {
                        setPageContext({
                          ...pageContext,
                          content: [
                            ...pageContext.content.map((x, i) => {
                              if (i === index) {
                                return {
                                  elem: "h3",
                                  text: "",
                                  _id: content._id,
                                };
                              } else return x;
                            }),
                          ],
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
      <Separator w-full bg-neutral-800 h="1px" mb-1 mt="1.5" />
    </>
  );
}
