// @ts-nocheck
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/lib/fetcher";

import type { Folder } from "@/types";

const DynamicFolder = dynamic(() => import("@/ui/app/folder"));
const DynamicNewFolder = dynamic(() => import("@/ui/app/folder/new"));

export default function Index() {
  const { data, isLoading, isFetching } = useQuery<[Folder]>(["folder"], () =>
    fetcher("/api/folder/find-all-and-populate-pages", "GET")
  );
  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="take notes" />
      </Head>
      <div grid justify-center pt-8>
        {data ? (
          <React.Suspense>
            {data?.map((folder, index) => (
              <div key={index}>
                <DynamicFolder folder={folder} />
              </div>
            ))}
            <DynamicNewFolder />
          </React.Suspense>
        ) : null}
        {isLoading ? (
          <>
            <h2>`loading-skeleton`</h2>
          </>
        ) : null}
        {isFetching && data ? (
          <>
            <h2>`update-skeleton`</h2>
          </>
        ) : null}
      </div>
      <div aria-hidden p-8 />
    </>
  );
}
