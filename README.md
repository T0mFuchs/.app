latest build log:

```
Route (pages)                              Size     First Load JS
┌ ○ /                                      4.26 kB        70.3 kB
├   /_app                                  0 B              66 kB
├ ○ /404                                   179 B          66.2 kB
└ λ /api/trpc/[trpc]                       0 B              66 kB
+ First Load JS shared by all              69.5 kB
  ├ chunks/main-e9b4da55be5174cb.js        33.9 kB
  ├ chunks/pages/_app-3cb0f1df05add69d.js  30.2 kB
  ├ chunks/webpack-077e322ec496f173.js     1.97 kB
  └ css/182b02ed3414b136.css               3.41 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
