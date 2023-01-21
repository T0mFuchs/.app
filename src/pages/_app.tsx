import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "uno.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
