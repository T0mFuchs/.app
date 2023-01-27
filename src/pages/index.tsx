// @ts-nocheck
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { trpc } from "@lib/trpc";

const TabsRoot = dynamic(() => import("@ui/lazy-export/radix-ui/tabs/root"));
const TabsList = dynamic(() => import("@ui/lazy-export/radix-ui/tabs/list"));
const TabsTrigger = dynamic(
  () => import("@ui/lazy-export/radix-ui/tabs/trigger")
);
const TabsContent = dynamic(
  () => import("@ui/lazy-export/radix-ui/tabs/content")
);
const ListFolder = dynamic(() => import("@ui/list/folder"));
const NewListFolder = dynamic(() => import("@ui/list/folder/new"));
const TableFolder = dynamic(() => import("@ui/table/folder"));
const NewTableFolder = dynamic(() => import("@ui/table/folder/new"));

export default function Index() {
  const { data, isLoading, isFetching } = trpc.folder.find.useQuery({});
  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="take notes" />
      </Head>
      <>
        {data ? (
          <React.Suspense>
            <TabsRoot defaultValue="list" grid absolute top-8 left-8 w-full>
              <TabsList flex gap-1 pb-6>
                <TabsTrigger
                  bg-transparent
                  border-0
                  text-6
                  value="list"
                  className="tatr"
                >
                  <span i-mdi-format-list-bulleted />
                </TabsTrigger>
                <TabsTrigger
                  bg-transparent
                  border-0
                  text-6
                  value="table"
                  className="tatr"
                >
                  <span i-mdi-table />
                </TabsTrigger>
              </TabsList>
              <TabsContent grid outline-none value="list">
                {data.map((folder, index) => (
                  <div key={index}>
                    <ListFolder folder={folder} />
                  </div>
                ))}
                <NewListFolder />
              </TabsContent>
              <TabsContent flex-grow outline-none value="table">
                <div inline-flex w-full relative left-="1.5">
                  <span title="Name" w="30%">
                    <span i-mdi-folder />
                  </span>
                  <span title="Subdocuments" w="5%">
                    <span i-mdi-file pl-10 />
                  </span>
                  <span title="Creation Date" w="15%">
                    <span i-mdi-calendar-range />
                  </span>
                  <span title="Last Modified" w="20%">
                    <span i-mdi-history />
                  </span>
                  <span title="List of Tags" w="30%">
                    <span i-mdi-tag pr-10 />
                  </span>
                </div>
                {data.map((folder, index) => (
                  <div key={index}>
                    <TableFolder folder={folder} />
                  </div>
                ))}
                <NewTableFolder />
              </TabsContent>
            </TabsRoot>
          </React.Suspense>
        ) : null}
        {isLoading ? (
          <></>
        ) : null}
        {isFetching && data ? (
          <></>
        ) : null}
      </>
    </>
  );
}
