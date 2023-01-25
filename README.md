latest build log:

```
Route (pages)                                                                Size     First Load JS
┌ ○ /                                                                        5.63 kB          49 kB
├   /_app                                                                    0 B            43.4 kB
├ ○ /404                                                                     179 B          43.5 kB
├ λ /api/folder/[folder_id]/create-page                                      0 B            43.4 kB
├ λ /api/folder/[folder_id]/create-tag                                       0 B            43.4 kB
├ λ /api/folder/[folder_id]/pages/[_id]/content/[content_id]/delete-content  0 B            43.4 kB
├ λ /api/folder/[folder_id]/pages/[_id]/content/[content_id]/update-content  0 B            43.4 kB
├ λ /api/folder/[folder_id]/pages/[_id]/content/create-content               0 B            43.4 kB
├ λ /api/folder/[folder_id]/pages/[_id]/delete-page                          0 B            43.4 kB
├ λ /api/folder/[folder_id]/pages/[_id]/tags/[tag_id]/delete-tag             0 B            43.4 kB
├ λ /api/folder/[folder_id]/pages/[_id]/tags/[tag_id]/update-tag             0 B            43.4 kB
├ λ /api/folder/[folder_id]/pages/[_id]/tags/create-tag                      0 B            43.4 kB
├ λ /api/folder/[folder_id]/pages/[_id]/update-page                          0 B            43.4 kB
├ λ /api/folder/[folder_id]/tags/[_id]/delete-tag                            0 B            43.4 kB
├ λ /api/folder/[folder_id]/tags/[_id]/update-tag                            0 B            43.4 kB
├ λ /api/folder/create-folder                                                0 B            43.4 kB
├ λ /api/folder/delete-folder                                                0 B            43.4 kB
├ λ /api/folder/find-all-and-populate-pages                                  0 B            43.4 kB
└ λ /api/folder/update-folder                                                0 B            43.4 kB
+ First Load JS shared by all                                                45.6 kB
  ├ chunks/main-e9b4da55be5174cb.js                                          33.9 kB
  ├ chunks/pages/_app-d9569144ae31d475.js                                    7.9 kB
  ├ chunks/webpack-74c62b1be1bcb894.js                                       1.58 kB
  └ css/f6e2fd959b223641.css                                                 2.27 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
