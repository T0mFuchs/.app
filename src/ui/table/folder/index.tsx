// @ts-nocheck
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { formatDistance, formatISO } from "date-fns";
import { trpc } from "@lib/trpc";

import FolderTag from "./tag";
import NewFolderTag from "./tag/new";

import type { Folder } from "@types";

export default function Index({ folder }: { folder: Folder }) {
  const [openWarning, setOpenWarning] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [currentFolder, setCurrentFolder] = React.useState<Folder>(folder);

  const updateFolder = trpc.folder.update.useMutation();
  const deleteFolder = trpc.folder.delete.useMutation();

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
        deleteFolder.mutate({ ...currentFolder });
        setOpenWarning(false);
        return;
      }
    }
    if (
      currentFolder?.name !== folder.name ||
      currentFolder?.color !== folder.color
    ) {
      updateFolder.mutate({ ...updatedFolder });
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
      {openWarning ? (
        <div text-red font-700 animate-pulse leading-4 text-sm pb-1>
          {"<!> "}this folder is <span underline>not</span> empty{" <!>"}
        </div>
      ) : null}
      <div w-full>
        <form onSubmit={onSubmit} inline-flex w="30%">
          <Label htmlFor="color" />
          <input
            i-mdi-folder
            relative
            right="1.5"
            top-2
            outline-none
            type="color"
            name="color"
            value={currentFolder?.color}
            onChange={(e) =>
              setCurrentFolder({
                ...currentFolder,
                color: e.target.value,
              })
            }
            style={{
              backgroundColor: currentFolder?.color,
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
            style={{
              width: `${
                currentFolder && currentFolder.name?.length > 3
                  ? currentFolder?.name?.length + 1
                  : 4
              }ch`,
            }}
          />
        </form>
        <span
          w="5%"
          title="sub pages"
          inline-flex
          relative
          top="-2.25"
          pl-4
          pr-1
          text-base
          leading-4
        >
          {folder.pages?.length ?? 0}
        </span>
        <span
          w="15%"
          title="creation date"
          inline-flex
          relative
          top="-2.5"
          px-2
          text-base
          leading-4
        >
          {formatISO(new Date(folder.iat), { representation: "date" })}
        </span>
        <span
          w="20%"
          title="last edited"
          inline-flex
          relative
          top="-2.5"
          text-base
          leading-4
        >
          {formatDistance(new Date(folder.eat), Date.now(), {
            includeSeconds: true,
            addSuffix: true,
          })}
        </span>
        <span inline-flex w="30%">
          {folder.tags?.map((tag, index) => (
            <div key={index}>
              <FolderTag tag={tag} folder_id={folder._id as string} />
            </div>
          ))}
          <NewFolderTag folder_id={folder._id as string} />
        </span>
      </div>
    </>
  );
}
