latest build log:

```
Route (pages)                              Size     First Load JS
┌ ○ /                                      4.23 kB        70.2 kB
├   /_app                                  0 B              66 kB
├ ○ /404                                   179 B          66.2 kB
└ λ /api/trpc/[trpc]                       0 B              66 kB
+ First Load JS shared by all              69.1 kB
  ├ chunks/main-e9b4da55be5174cb.js        33.9 kB
  ├ chunks/pages/_app-23e643c4c148461b.js  30.2 kB
  ├ chunks/webpack-72bfd5a37a119cff.js     1.93 kB
  └ css/97ad14671ea094bd.css               3.1 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
