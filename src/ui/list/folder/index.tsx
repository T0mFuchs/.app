// @ts-nocheck
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
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

  const updateMutation = trpc.folder.update.useMutation();
  const deleteMutation = trpc.folder.delete.useMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedFolder: Folder = {
      _id: currentFolder?._id,
      name: e.target.name.value,
      color: e.target.color.value,
      tags: currentFolder?.tags,
      pages: currentFolder?.pages,
      iat: currentFolder?.iat,
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
            <Accordion.Trigger
              border-0
              bg-transparent
              rounded
              hover:animate-pulse
              focus:animate-pulse
              outline-none
              inline-flex
              shadow-lg
              className="hover:shadow-neutral-800/30 focus:shadow-neutral-800/30 at"
            >
              <form onSubmit={onSubmit}>
                <Label htmlFor="color" />
                <input
                  i-mdi-folder-outline
                  relative
                  right="1.5"
                  top="-.5"
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
                      name: e.target.value,
                    })
                  }
                  value={
                    currentFolder && currentFolder?._id === folder._id
                      ? currentFolder.name
                      : folder.name
                  }
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
            {folder.tags?.map((tag, index) => (
              <div key={index}>
                <FolderTag tag={tag} folder_id={folder._id as string} />
              </div>
            ))}
            <NewFolderTag folder_id={folder._id as string} />
          </span>
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
                  <Page page={page} folder_id={folder._id as string} />
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
