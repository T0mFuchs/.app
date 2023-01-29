import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@lib/trpc";
import type { AppProps } from "next/app";
import "uno.css";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <style global jsx>{`
          /* https://github.com/vercel/styled-jsx */
          :root {
            --text: #0e0c0c;
            --bg: #f0f0efee;
            --tag: #b3b3b3;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --text: #faf9efe5;
              --bg: #131313;
              --tag: #333333;
            }
          }
          * {
            box-sizing: border-box;
            margin: 0;
          }
          body {
            color: var(--text);
            background: var(--bg);
          }
          html {
            overflow-x: hidden;
          }
          @media (prefers-color-scheme: dark) {
            html {
              color-scheme: dark;
            }
          }
          /* shortcut classes */
          @media (max-width: 768px) {
            .s {
              box-shadow: 0 0 0 100vmax rgba(15, 16, 17, 0.99);
            }
          }
          .tt5050 {
            transform: translate(-50%, -50%);
          }
          /* TabsTrigger */
          .tatr[data-state="active"] {
            border-bottom: 1px solid #262626;
          }
          /* AccordionTrigger */
          .at[data-state="open"] > .i {
            transform: rotate(180deg);
          }
          /* AccordionContent */
          .ac {
            transition: 150ms;
          }
          .ac[data-state="open"] {
            animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
          }
          .ac[data-state="closed"] {
            animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
          }
          @keyframes slideDown {
            from {
              height: 0;
              opacity: 0;
            }
            to {
              height: var(--radix-accordion-content-height);
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              height: var(--radix-accordion-content-height);
            }
            to {
              height: 0;
            }
          }
          /* dialog.overlay */
          .o {
            animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          /* dialog.content */
          .c {
            animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes overlayShow {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes contentShow {
            from {
              opacity: 0;
              transform: translate(-50%, -48%) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
        `}</style>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default trpc.withTRPC(App);
