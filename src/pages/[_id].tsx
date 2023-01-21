//? render pages by theri id, that are not inside of a folder // make one for folders too
// @ts-nocheck
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/lib/fetcher";

import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Page } from "@/types";

const DynamicPage = dynamic(() => import("@/ui/app/folder/page"));
const DynamicNewPage = dynamic(() => import("@/ui/app/folder/page/new"));

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { _id } = context.query as { _id: string };
  return {
    props: {
      _id,
    },
  };
};

export default function Page({ _id }: { _id: string }) {
  const { data } = useQuery<Page>(["page"], () =>
    fetcher(`/api/page/${_id}/findOne`, "POST")
  );
  return (
    <>
      <Head>
        <title>{data ? data.title : "..."}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div grid justify-center pt-8>
        <React.Suspense>
          {data ? (
            <>
              <DynamicPage page={data} />
            </>
          ) : (
            <>
              <h2>`fallback`</h2>
            </>
          )}
        </React.Suspense>
      </div>
    </>
  );
}
