// @ts-nocheck
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/lib/fetcher";

import type { Folder } from "@/types";

const DynamicFolder = dynamic(() => import("@/ui/app/folder"), { ssr: false });
const DynamicNewFolder = dynamic(() => import("@/ui/app/folder/new"), {
  ssr: false,
});

export default function Index() {
  const { data, isLoading, isFetching } = useQuery<[Folder]>(["folder"], () =>
    fetcher("/api/folder/find-populate-folders", "GET")
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
          <>
            {data?.map((folder) => (
              <DynamicFolder folder={folder} key={folder._id} />
            ))}
            <DynamicNewFolder />
          </>
        ) : null}
        {isLoading ? (
          <>
            <h2>`loading-state`</h2>
          </>
        ) : null}
        {isFetching && data ? (
          <>
            <h2>`refetching-state`</h2>
          </>
        ) : null}
      </div>
      <div aria-hidden p-8 />
    </>
  );
}
