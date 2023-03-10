// @ts-nocheck
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { PageContext } from "@context/page";
import { trpc } from "@lib/trpc";

import Page from "./page";
import NewPage from "./page/new";
import FolderTag from "./tag";
import NewFolderTag from "./tag/new";

import type { Folder } from "@types";

export default function Index({ folder }: { folder: Folder }) {
  const [openWarning, setOpenWarning] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [currentFolder, setCurrentFolder] = React.useState<Folder>(folder);
  const {
    page: pageContext,
    setPage: setPageContext,
    folder: folderContext,
    setFolder: setFolderContext,
  } = React.useContext(PageContext);

  React.useEffect(() => {
    if (folder) {
      setCurrentFolder(folder);
    }
  }, [folder, setCurrentFolder]);

  const updateMutation = trpc.folder.update.useMutation();
  const deleteMutation = trpc.folder.delete.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedFolder: Folder = {
      _id: folder._id,
      name: e.target.name.value,
      color: e.target.color.value,
      tags: folder.tags,
      pages: folder.pages,
      iat: folder.iat,
    };
    if (updatedFolder.name === "") {
      if (updatedFolder.pages?.length > 0 && openWarning) {
        setOpenConfirm(true);
        return;
      }
      if (updatedFolder.pages?.length > 0 && !openWarning) {
        setOpenWarning(true);
        setTimeout(() => setOpenWarning(false), 5000);
        return;
      } else {
        deleteMutation.mutate({ ...currentFolder });
        setOpenWarning(false);
        return;
      }
    }
    if (
      currentFolder?.name !== folder.name ||
      currentFolder?.color !== folder.color
    ) {
      updateMutation.mutate({ ...updatedFolder });
    }
  };

  return (
    <>
      <Dialog.Root open={openConfirm} onOpenChange={setOpenConfirm}>
        <Dialog.Portal>
          <Dialog.Overlay inset-0 fixed bg-neutral="900/95" className="d" />
          <Dialog.Content
            fixed
            top="1/2"
            left="1/2"
            shadow-xl
            shadow-neutral="800/30"
            className="tt5050 c"
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
                deleteMutation.mutate({ ...currentFolder });
                setOpenConfirm(false);
                setOpenWarning(false);
              }}
            >
              confirm deletion
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Accordion.Root type="multiple">
        <Accordion.Item value={`item-folder-${folder?._id}`}>
          <Accordion.Header>
            {openWarning ? (
              <div text-red font-700 animate-pulse leading-4 text-sm pb-1>
                {"<!> "}this folder is <span underline>not</span> empty{" <!>"}
              </div>
            ) : null}
            <form inline-flex onSubmit={onSubmit}>
              <Label htmlFor="color" />
              <input
                i-mdi-folder
                relative
                right="1.5"
                top="1.5"
                outline-none
                type="color"
                name="color"
                value={currentFolder?.color ?? "var(--text)"}
                onChange={(e) =>
                  setCurrentFolder({
                    ...currentFolder,
                    color: e.target.value,
                  })
                }
                style={{
                  backgroundColor: currentFolder?.color ?? "var(--text)",
                }}
              />
              <Accordion.Trigger
                border-0
                bg-transparent
                rounded
                hover:animate-pulse
                focus:animate-pulse
                outline-none
                inline-flex
                shadow-lg
                onClick={() => {
                  setFolderContext(folder);
                  setPageContext(null);
                }}
                className="hover:shadow-neutral-800/30 focus:shadow-neutral-800/30 at"
              >
                <Label htmlFor="name" />
                <input
                  type="text"
                  name="name"
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
                    setCurrentFolder({
                      ...currentFolder,
                      _id: folder._id,
                      name: e.target.value,
                    })
                  }
                  value={
                    currentFolder && currentFolder?._id === folder._id
                      ? currentFolder.name
                      : folder.name
                  }
                  style={{
                    width: `${
                      currentFolder && currentFolder.name?.length > 3
                        ? currentFolder?.name?.length + 1
                        : 4
                    }ch`,
                  }}
                />

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
              <span inline-flex>
                {folder.tags?.map((tag, index) => (
                  <span pl-2 key={index}>
                    <FolderTag tag={tag} folder_id={folder._id as string} />
                  </span>
                ))}
                <NewFolderTag folder_id={folder._id as string} />
              </span>
            </form>
          </Accordion.Header>
          <div aria-hidden p-1 />
          {folder.pages?.[0] !== null ? (
            <>
              {folder.pages?.map((page, index) => (
                <Accordion.Content
                  className="ac"
                  key={page._id}
                  relative
                  left-3
                >
                  <Page
                    index={index}
                    page={page}
                    folder_id={folder._id as string}
                  />
                </Accordion.Content>
              ))}
            </>
          ) : null}
          <Accordion.Content className="ac" relative left-3>
            <NewPage folder_id={folder._id as string} />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
}
