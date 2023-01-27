latest build log:

```
Route (pages)                              Size     First Load JS
┌ ○ /                                      2.53 kB        65.4 kB
├   /_app                                  0 B            62.8 kB
├ ○ /404                                   179 B            63 kB
└ λ /api/trpc/[trpc]                       0 B            62.8 kB
+ First Load JS shared by all              65.8 kB
  ├ chunks/main-e9b4da55be5174cb.js        33.9 kB
  ├ chunks/pages/_app-4638370263d46384.js  27.2 kB
  ├ chunks/webpack-afdcd7744fae3488.js     1.8 kB
  └ css/b361aa2e60eb7aab.css               2.97 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
