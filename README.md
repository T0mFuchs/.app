latest build log:

```
Route (pages)                              Size     First Load JS
┌ ○ /                                      3.87 kB        66.8 kB
├   /_app                                  0 B            62.9 kB
├ ○ /404                                   179 B          63.1 kB
└ λ /api/trpc/[trpc]                       0 B            62.9 kB
+ First Load JS shared by all              65.9 kB
  ├ chunks/main-e9b4da55be5174cb.js        33.9 kB
  ├ chunks/pages/_app-f2553d6fb107d6f6.js  27.1 kB
  ├ chunks/webpack-95a29bb824119887.js     1.91 kB
  └ css/73129c5316477062.css               3 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
