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

import { updateOnePage } from "@/hooks/fetch/page/updateOnePage";
import { deleteOnePage } from "@/hooks/fetch/page/deleteOnePage";

import Content from "./content";

import type { Page } from "@/types";
import NewPageContent from "./content/new";

export default function Page({
  page,
  folder_id,
}: {
  page: Page;
  folder_id?: string;
}) {
  const [currentPage, setCurrentPage] = React.useState<Page>(null);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    (updatedPage: Page) =>
      updateOnePage(updatedPage, folder_id, currentPage._id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const deleteMutation = useMutation(
    (page: Page) => deleteOnePage(page, folder_id, currentPage._id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["folder"] });
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedPage: Page = {
      _id: currentPage?._id,
      title: e.target.title.value,
    };
    if (updatedPage.title === "") {
      deleteMutation.mutate({ ...currentPage });
      return;
    }
    if (currentPage?.title !== page.title) {
      updateMutation.mutate({ ...updatedPage });
      return;
    }
  };

  return (
    <>
      <Accordion type="multiple" key={page._id}>
        <AccordionItem value={`item-page-${page._id}`}>
          <AccordionHeader>
            <AccordionTrigger className="at" asChild>
              <div inline-flex>
                <span i-mdi-file relative top-1 right-1 />
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
                    onFocus={() => setCurrentPage(page)}
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
                  />
                </form>
                <span
                  i-mdi-chevron-down
                  className="i"
                  relative
                  top-1
                  left-1
                  transform-gpu
                  transition-transform
                  duration-300
                />
              </div>
            </AccordionTrigger>
          </AccordionHeader>
          <div aria-hidden p-1 />
          {page.content?.map((row, index) => (
            <AccordionContent className="ac" key={index} relative left-3>
              <Content elem={row.elem} text={row.text} />
            </AccordionContent>
          ))}
          <AccordionContent className="ac" relative left-3>
            <NewPageContent
              folder_id={folder_id as string}
              page_id={page._id as string}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
