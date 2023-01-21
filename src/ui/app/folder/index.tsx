// @ts-nocheck
import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Label } from "@radix-ui/react-label";

import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updateOneFolder } from "@/hooks/fetch/folder/updateOneFolder";
import { deleteOneFolder } from "@/hooks/fetch/folder/deleteOneFolder";

import Page from "./page";
import NewPage from "./page/new";

import type { Folder } from "@/types";

export default function Index({
  folder,
  key,
}: {
  folder: Folder;
  key?: React.Key;
}) {
  const [currentFolder, setCurrentFolder] = React.useState<Folder>(null);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    (updatedFolder: Folder) => updateOneFolder(updatedFolder),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );
  const deleteMutation = useMutation(
    (folder: Folder) => deleteOneFolder(folder),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedFolder: Folder = {
      _id: currentFolder?._id,
      name: e.target.name.value,
    };
    if (updatedFolder.name === "") {
      deleteMutation.mutate({ ...currentFolder });
    }
    if (currentFolder?.name !== folder.name) {
      updateMutation.mutate({ ...updatedFolder });
    }
  };

  return (
    <>
      <Accordion type="multiple" key={key}>
        <AccordionItem value={`item-folder-${folder?._id}`}>
          <AccordionHeader>
            <AccordionTrigger asChild>
              <div inline-flex className="at">
                <span i-mdi-folder relative top-1 right-1 />
                <form onSubmit={onSubmit}>
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
                    onFocus={() => setCurrentFolder(folder)}
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
                <span i-mdi-chevron-down className="i" relative top-1 left-1 transform-gpu transition-transform duration-300 />
              </div>
            </AccordionTrigger>
          </AccordionHeader>
          <div aria-hidden p-1 />
          {folder.pages?.[0] !== null ? (
            <>
              {folder.pages?.map((page, index) => (
                <AccordionContent className="ac" key={page._id} relative left-3>
                  <Page
                    page={page}
                    index={index}
                    folder_id={folder._id as string}
                  />
                </AccordionContent>
              ))}
            </>
          ) : null}
          <AccordionContent className="ac" relative left-3>
            <NewPage folder_id={folder._id as string} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}