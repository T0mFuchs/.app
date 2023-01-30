// @ts-nocheck
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-separator";
import { Label } from "@radix-ui/react-label";
import { trpc } from "@lib/trpc";
import { PageContext } from "@context/page";
import { format } from "date-fns";

import PageTag from "@ui/app/page/tag";
import NewPageTag from "@ui/app/page/tag/new";
import PageContent from "@ui/app/page/content";
import NewPageContent from "@ui/app/page/content/new";

import type { Page } from "@types";

export default function PageModal({
  page,
  folder_id,
}: {
  page: Page | undefined;
  folder_id?: string;
}) {
  const {
    page: pageContext,
    setPage: setPageContext,
    folder: folderContext,
    setFolder: setFolderContext,
  } = React.useContext(PageContext);

  const [openWarning, setOpenWarning] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const updateFolderPage = trpc.folderPages.update.useMutation();
  const deleteFolderPage = trpc.folderPages.delete.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedPage: Page = {
      _id: pageContext?._id,
      title: e.target.title.value,
      color: pageContext?.color,
      tags: pageContext?.tags,
      content: pageContext?.content,
      iat: pageContext?.iat,
    };

    if (updatedPage.title === "") {
      if (updatedPage.content?.length > 0 && openWarning) {
        setOpenConfirm(true);
        return null;
      }
      if (updatedPage.content?.length > 0 && !openWarning) {
        setOpenWarning(true);
        return null;
      } else {
        deleteFolderPage.mutate({
          folder_id: folder_id,
          page_id: page._id,
        });
        setPageContext(null);
        setOpenWarning(false);
        return null;
      }
    }
    updateFolderPage.mutate({
      folder_id: folder_id,
      page_id: page._id,
      ...updatedPage,
    });
  };

  const ref = React.useRef(null);
  const refLeft = React.useRef(null);

  React.useEffect(() => {
    const resizableElem = ref.current;
    const styles = window.getComputedStyle(resizableElem);

    let width = parseInt(styles.width, 10);
    let x = 0;

    const onMouseMoveLeftResize = (e) => {
      const dx = e.clientX - x;
      x = e.clientX;
      width = width - dx;
      resizableElem.style.width = `${width}px`;
    };
    const onMouseUpLeftResize = (e) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };
    const onMouseDownLeftResize = (e) => {
      x = e.clientX;
      resizableElem.style.right = styles.right;
      resizableElem.style.left = null;
      resizableElem.style.cursor = "ew-resize";
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };
    const resizerLeft = refLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);
    return () => {
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
    };
  }, []);

  if (!pageContext) return null;
  return (
    <div fixed z--1 right-0>
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
      <div ref={ref} style={{ backgroundColor: "var(--bg)" }}>
        <div aria-hidden z--1 fixed className="o s" />
        <button
          i-mdi-close
          relative
          top-1
          left="-3.5"
          bg-red
          onClick={() => setPageContext(null)}
        />
        <div>
          <span i-mdi-link relative top="-.5" mr-1 />
          {page._id}
          <span i-mdi-chevron-double-right relative top="-.5" mr-1 />
          {folder_id}
        </div>
        <Separator
          absolute
          h="1px"
          w-full
          bg-neutral-800
          orientation="horizontal"
        />
        <Separator
          absolute
          w="1px"
          h="100vmax"
          bg-neutral-800
          orientation="vertical"
          ref={refLeft}
        />
        <div>
          <form onSubmit={onSubmit}>
            <Label htmlFor="title" />
            <input
              type="text"
              name="title"
              p-1
              border-0
              text-lg
              font-100
              bg-transparent
              outline-none
              w-full
              onChange={(e) => {
                setPageContext({
                  ...pageContext,
                  title: e.target.value,
                });
                console.log(pageContext, e.target.value);
              }}
              value={pageContext?.title}
              placeholder="Untitled"
            />
          </form>
          <div flex>
            <span i-mdi-calendar-range />
            <span pr-4>Created</span>
            <span>
              {format(new Date(pageContext?.iat), "MMMM d, yyyy h:mm a")}
            </span>
          </div>
          <div flex>
            <span i-mdi-tag relative top-2 />
            <span relative top-2>
              Tags
            </span>
            <span inline-flex relative left-5>
              {pageContext?.tags?.map((tag, index) => (
                <PageTag
                  tag={tag}
                  key={index}
                  index={index}
                  folder_id={folder_id}
                  page_id={pageContext._id}
                />
              ))}
              <NewPageTag folder_id={folder_id} page_id={pageContext._id} />
            </span>
          </div>
          <Separator bg-neutral-800 w-full h="1px" />
          <div p-4>
            {pageContext?.content?.map((content, index) => (
              <PageContent
                content={content}
                key={index}
                index={index}
                folder_id={folder_id}
                page_id={pageContext._id}
              />
            ))}
            <NewPageContent folder_id={folder_id} page_id={pageContext._id} />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
