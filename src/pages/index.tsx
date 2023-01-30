// @ts-nocheck
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { trpc } from "@lib/trpc";
import { PageContext } from "@context/page";
import { Separator } from "@radix-ui/react-separator";

import type { Folder, Page } from "@types";

const loadFeatures = () =>
  import("@features/framer-motion/domMax").then((res) => res.default);

const TabsRoot = dynamic(() => import("@ui/lazy-export/radix-ui/tabs/root"));
const TabsList = dynamic(() => import("@ui/lazy-export/radix-ui/tabs/list"));
const TabsTrigger = dynamic(
  () => import("@ui/lazy-export/radix-ui/tabs/trigger")
);
const TabsContent = dynamic(
  () => import("@ui/lazy-export/radix-ui/tabs/content")
);
const AnimatePresence = dynamic(
  () => import("@ui/lazy-export/framer-motion/AnimatePresence")
);
const LazyMotion = dynamic(
  () => import("@ui/lazy-export/framer-motion/LazyMotion")
);
const MotionDiv = dynamic(() => import("@ui/lazy-export/framer-motion/m/div"));
const ListFolder = dynamic(() => import("@ui/app/list//folder"));
const NewListFolder = dynamic(() => import("@ui/app/list/folder/new"));
const TableFolder = dynamic(() => import("@ui/app/table/folder"));
const NewTableFolder = dynamic(() => import("@ui/app/table/folder/new"));
const PageModal = dynamic(() => import("@ui/app/page/modal"));

export default function Index() {
  const { data, isLoading, isFetching } = trpc.folder.find.useQuery({});
  const [value, setValue] = React.useState<string>("0");
  const [page, setPage] = React.useState<Page | undefined>(null);
  const [folder, setFolder] = React.useState<Folder | undefined>(null);
  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
      </Head>
      <div>
        {data ? (
          <React.Suspense>
            <PageContext.Provider value={{ page, setPage, folder, setFolder }}>
              <div>
                <TabsRoot defaultValue="0" grid absolute top-8 left-8 w-full>
                  <TabsList flex gap-1 pb-6>
                    <TabsTrigger
                      className="tatr"
                      bg-transparent
                      border-0
                      text-6
                      leading-6
                      value="0"
                      onClick={() => setValue("0")}
                    >
                      <span i-mdi-format-list-bulleted />
                    </TabsTrigger>
                    <Separator
                      orientation="vertical"
                      h-6
                      w="1px"
                      bg-neutral-800
                    />
                    <TabsTrigger
                      className="tatr"
                      bg-transparent
                      border-0
                      text-6
                      leading-6
                      value="1"
                      onClick={() => setValue("1")}
                    >
                      <span i-mdi-table />
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent grid outline-none value="0">
                    <AnimatePresence initial={false}>
                      {value === "0" ? (
                        <LazyMotion features={loadFeatures}>
                          <MotionDiv
                            variants={{
                              initial: {
                                opacity: 0,
                                x: -50,
                              },
                              animate: {
                                opacity: 1,
                                x: 0,
                              },
                              exit: {
                                opacity: 0,
                                x: -25,
                              },
                            }}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            {data.map((folder, index) => (
                              <div key={index}>
                                <ListFolder folder={folder} />
                              </div>
                            ))}
                            <NewListFolder />
                          </MotionDiv>
                        </LazyMotion>
                      ) : null}
                    </AnimatePresence>
                  </TabsContent>
                  <TabsContent flex-grow outline-none value="1">
                    <AnimatePresence initial={false} mode="popLayout">
                      {value === "1" ? (
                        <LazyMotion features={loadFeatures}>
                          <MotionDiv
                            variants={{
                              initial: {
                                opacity: 0,
                                x: -50,
                              },
                              animate: {
                                opacity: 1,
                                x: 0,
                              },
                              exit: {
                                opacity: 0,
                                x: -25,
                              },
                            }}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <div inline-flex w-full relative left-="1.5" pb-2>
                              <span title="Name" w="30%">
                                <span i-mdi-folder />
                              </span>
                              <span aria-hidden px-1 />
                              <span title="Subdocuments" w="5%">
                                <span i-mdi-file />
                              </span>
                              <span title="Creation Date" w="15%">
                                <span i-mdi-calendar-range />
                              </span>
                              <span title="Last Modified" w="20%">
                                <span i-mdi-history />
                              </span>
                              <span title="List of Tags" w="30%">
                                <span i-mdi-tag />
                              </span>
                            </div>
                            <Separator w-full h="1px" bg-neutral-800 relative />
                            {data.map((folder, index) => (
                              <div key={index}>
                                <TableFolder folder={folder} />
                              </div>
                            ))}
                            <NewTableFolder />
                          </MotionDiv>
                        </LazyMotion>
                      ) : null}
                    </AnimatePresence>
                  </TabsContent>
                </TabsRoot>
              </div>
              <>
                <AnimatePresence>
                  {page && folder ? (
                    <LazyMotion features={loadFeatures}>
                      <MotionDiv
                        variants={{
                          initial: {
                            opacity: 0,
                            x: 300,
                          },
                          animate: {
                            opacity: 1,
                            x: 0,
                          },
                          exit: {
                            opacity: 0,
                            x: 200,
                          },
                        }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <PageModal page={page} folder_id={folder._id} />
                      </MotionDiv>
                    </LazyMotion>
                  ) : null}
                </AnimatePresence>
              </>
            </PageContext.Provider>
          </React.Suspense>
        ) : null}
        {isLoading ? <></> : null}
        {isFetching && data ? <></> : null}
      </div>
    </>
  );
}
