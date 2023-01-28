// @ts-nocheck
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";

import { trpc } from "@lib/trpc";

import PageTag from "./tag";
import NewPageTag from "./tag/new";
import PageContent from "./content";
import NewPageContent from "./content/new";

import type { Page } from "@types";

export default function Page({
  page,
  folder_id,
}: {
  page: Page;
  folder_id?: string;
}) {
  const [openWarning, setOpenWarning] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<Page>(page);

  const updateFolderPage = trpc.folderPages.update.useMutation();
  const deleteFolderPage = trpc.folderPages.delete.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedPage: Page = {
      _id: currentPage?._id,
      title: e.target.title.value,
      color: e.target.color.value,
      tags: currentPage?.tags,
      content: currentPage?.content,
      iat: currentPage?.iat,
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
          folder_id: folder_id,
          page_id: page._id,
        });
        setOpenWarning(false);
        return;
      }
    }
    if (
      currentPage?.title !== page.title ||
      currentPage?.color !== page.color
    ) {
      updateFolderPage.mutate({
        folder_id: folder_id,
        page_id: page._id,
        ...updatedPage,
      });
    }
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
                  folder_id: folder_id,
                  page_id: currentPage._id,
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
        <Accordion.Item value={`item-page-${page._id}`}>
          <Accordion.Header>
            {openWarning ? (
              <div text-red font-700 animate-pulse leading-4 text-sm pb-1>
                {"<!> "}this page is <span underline>not</span> empty{" <!>"}
              </div>
            ) : null}
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
                <Label htmlFor="color" />
                <input
                  i-mdi-file
                  relative
                  right="1.5"
                  top="-.5"
                  outline-none
                  type="color"
                  name="color"
                  value={currentPage?.color ?? "var(--text)"}
                  onChange={(e) =>
                    setCurrentPage({ ...currentPage, color: e.target.value })
                  }
                  style={{
                    backgroundColor: currentPage?.color ?? "var(--text)",
                  }}
                />
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
                    setCurrentPage({
                      ...currentPage,
                      title: e.target.value,
                    })
                  }
                  value={
                    currentPage && currentPage._id === page?._id
                      ? currentPage?.title
                      : page?.title
                  }
                  style={{
                    width: `${
                      currentPage && currentPage.title?.length > 3
                        ? currentPage?.title?.length + 1
                        : 4
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
          </Accordion.Header>
          <span inline-flex>
            {page.tags?.map((tag, index) => (
              <PageTag
                tag={tag}
                key={index}
                folder_id={folder_id as string}
                page_id={page._id as string}
              />
            ))}
            <NewPageTag
              folder_id={folder_id as string}
              page_id={page._id as string}
            />
          </span>
          <div aria-hidden p-1 />
          {page.content?.map((content, index) => (
            <Accordion.Content className="ac" key={index} relative left-3>
              <PageContent
                content={content}
                folder_id={folder_id as string}
                page_id={page._id as string}
              />
            </Accordion.Content>
          ))}
          <Accordion.Content className="ac" relative left-3>
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
