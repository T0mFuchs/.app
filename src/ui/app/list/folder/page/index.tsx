// @ts-nocheck
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { PageContext } from "@context/page";
import { trpc } from "@lib/trpc";

import PageTag from "@ui/app/page/tag";
import NewPageTag from "@ui/app/page/tag/new";
import PageContent from "@ui/app/page/content";
import NewPageContent from "@ui/app/page/content/new";

import type { Page } from "@types";

export default function Page({
  index,
  page,
  folder_id,
}: {
  index: number;
  page: Page;
  folder_id?: string;
}) {
  const [openWarning, setOpenWarning] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const updateFolderPage = trpc.folderPages.update.useMutation();
  const deleteFolderPage = trpc.folderPages.delete.useMutation();
  const {
    page: pageContext,
    setPage: setPageContext,
    pageIndex: pageContextIndex,
    setPageIndex: setPageContextIndex,
    folder: folderContext,
    setFolder: setFolderContext,
  } = React.useContext(PageContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedPage: Page = {
      _id: page?._id,
      title: e.target.title.value,
      color: e.target.color.value,
      tags: page.tags,
      content: page.content,
      iat: page.iat,
    };

    if (updatedPage.title === "") {
      if (updatedPage.content?.length > 0 && openWarning) {
        setOpenConfirm(true);
        return;
      }
      if (updatedPage.content?.length > 0 && !openWarning) {
        setOpenWarning(true);
        return;
      } else {
        deleteFolderPage.mutate({
          folder_id: folderContext?._id,
          page_id: page._id,
        });
        setOpenWarning(false);
        return;
      }
    }
    if (
      pageContext?.title !== page.title ||
      pageContext?.color !== page.color
    ) {
      updateFolderPage.mutate({
        folder_id: folder_id,
        page_id: page._id,
        ...updatedPage,
      });
    }
  };

  const openModalRef = React.useRef<>(null);

  const mouseEnter = (evt) => {
    openModalRef.current.style.opacity = 1;
  };
  const mouseLeave = (evt) => {
    openModalRef.current.style.opacity = 0;
  };

  return (
    <>
      <Dialog.Root open={openConfirm} onOpenChange={setOpenConfirm}>
        <Dialog.Portal>
          <Dialog.Overlay inset-0 fixed bg-neutral="900/95" className="do" />
          <Dialog.Content
            fixed
            top="1/2"
            left="1/2"
            shadow-xl
            shadow-neutral="800/30"
            className="tt5050 dc"
          >
            <button
              autoFocus
              focus:animate-pulse
              px-1
              border-0
              rounded
              text-base
              text-red
              font-700
              outline-none
              onClick={() => {
                deleteFolderPage.mutate({
                  folder_id: folderContext?._id,
                  page_id: pageContext._id,
                });
                setOpenConfirm(false);
                setOpenWarning(false);
              }}
            >
              confirm deletion
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Accordion.Root type="multiple" key={page._id}>
        <Accordion.Item
          value={`item-page-${page._id}`}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          <Accordion.Header>
            {openWarning ? (
              <div text-red font-700 animate-pulse leading-4 text-sm pb-1>
                {"<!> "}this page is <span underline>not</span> empty{" <!>"}
              </div>
            ) : null}
            <ContextMenu.Root modal={false}>
              <ContextMenu.Trigger>
                <form inline-flex onSubmit={onSubmit}>
                  <Label htmlFor="color" />
                  <input
                    i-mdi-file
                    relative
                    right="1.5"
                    top="-.5"
                    outline-none
                    type="color"
                    name="color"
                    value={
                      pageContext && pageContext._id === page._id
                        ? pageContext?.color
                        : page.color
                    }
                    onChange={(e) =>
                      setPageContext({
                        ...pageContext,
                        color: e.target.value,
                      })
                    }
                    style={{
                      backgroundColor:
                        pageContext && pageContext._id === page._id
                          ? pageContext?.color
                          : page.color,
                    }}
                  />
                </form>
                <Accordion.Trigger
                  border-0
                  bg-transparent
                  border-b-1
                  rounded-t
                  hover:animate-pulse
                  focus:animate-pulse
                  outline-none
                  inline-flex
                  shadow-xl
                  className="hover:shadow-neutral-800/30 focus:shadow-neutral-800/30 at"
                >
                  <form onSubmit={onSubmit}>
                    <Label htmlFor="title" />
                    <input
                      type="text"
                      name="title"
                      p-1
                      border-0
                      rounded
                      leading-4
                      text-base
                      bg-transparent
                      hover:bg-neutral-800
                      focus:bg-neutral-800
                      outline-none
                      onChange={(e) =>
                        setPageContext({
                          ...pageContext,
                          title: e.target.value,
                        })
                      }
                      value={
                        pageContext && pageContext._id === page._id
                          ? pageContext?.title
                          : page.title
                      }
                      style={{
                        width: `${
                          pageContext?.title && pageContext._id === page._id
                            ? pageContext.title.length > 3
                              ? pageContext.title.length + 1
                              : 4
                            : page.title.length + 1
                        }ch`,
                      }}
                    />
                  </form>
                  <span
                    i-mdi-chevron-down
                    className="i"
                    relative
                    top="1.5"
                    left-1
                    transform-gpu
                    transition-transform
                    duration-300
                  />
                </Accordion.Trigger>
              </ContextMenu.Trigger>
              <ContextMenu.Content
                alignOffset={10}
                rounded-md
                bg-dark="600/95"
                w-16
                text-center
                shadow-lg
              >
                <ContextMenu.Item>
                  <button
                    relative
                    i-mdi-file-edit
                    title="open in separated"
                    style={{ backgroundColor: "var(--text)" }}
                    onClick={() => {
                      setPageContext(page);
                      setFolderContext({ _id: folder_id });
                    }}
                  />
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
            <button
              bg-transparent
              border-0
              inline-flex
              hover:animate-pulse
              focus:animate-pulse
              outline-none
              disabled={
                pageContext && pageContext.title === page.title ? true : false
              }
              onClick={() => {
                setPageContext(page);
                setPageContextIndex(index);
              }}
              style={{ opacity: 0 }}
              autoFocus
              ref={openModalRef}
            >
              <span i-mdi-dock-right relative top="1px" />
              <span pl-1>open</span>
            </button>
            <span inline-flex relative left-1>
              {page.tags?.map((tag, index) => (
                <PageTag
                  tag={tag}
                  key={index}
                  index={index}
                  folder_id={folder_id as string}
                  page_id={page._id as string}
                />
              ))}
              <NewPageTag
                folder_id={folder_id as string}
                page_id={page._id as string}
              />
            </span>
          </Accordion.Header>
          <div aria-hidden p-1 />
          <Accordion.Content className="ac" relative left-3>
            {page.content?.map((content, index) => (
              <PageContent
                content={content}
                key={index}
                index={index}
                folder_id={folder_id as string}
                page_id={page._id as string}
              />
            ))}
            <NewPageContent
              folder_id={folder_id as string}
              page_id={page._id as string}
            />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
}
