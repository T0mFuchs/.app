import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@lib/trpc";
import type { AppProps } from "next/app";
import "./styles.css";
import "uno.css";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default trpc.withTRPC(App);
