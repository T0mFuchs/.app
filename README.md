latest build log:

```
Route (pages)                                                              Size     First Load JS
┌ ○ /                                                                      5.63 kB          49 kB
├   /_app                                                                  0 B            43.4 kB
├ ○ /404                                                                   179 B          43.6 kB
├ λ /api/folder/[folder_id]/[page_id]/content/[content_id]/delete-content  0 B            43.4 kB
├ λ /api/folder/[folder_id]/[page_id]/content/[content_id]/update-content  0 B            43.4 kB
├ λ /api/folder/[folder_id]/[page_id]/content/create-content               0 B            43.4 kB
├ λ /api/folder/[folder_id]/[page_id]/delete-page                          0 B            43.4 kB
├ λ /api/folder/[folder_id]/[page_id]/tags/[tag_id]/delete-tag             0 B            43.4 kB
├ λ /api/folder/[folder_id]/[page_id]/tags/[tag_id]/update-tag             0 B            43.4 kB
├ λ /api/folder/[folder_id]/[page_id]/tags/create-tag                      0 B            43.4 kB
├ λ /api/folder/[folder_id]/[page_id]/update-page                          0 B            43.4 kB
├ λ /api/folder/[folder_id]/create-page                                    0 B            43.4 kB
├ λ /api/folder/create-folder                                              0 B            43.4 kB
├ λ /api/folder/delete-folder                                              0 B            43.4 kB
├ λ /api/folder/find-all-and-populate-pages                                0 B            43.4 kB
└ λ /api/folder/update-folder                                              0 B            43.4 kB
+ First Load JS shared by all                                              45.6 kB
  ├ chunks/main-e9b4da55be5174cb.js                                        33.9 kB
  ├ chunks/pages/_app-be704f77ba32292a.js                                  7.9 kB
  ├ chunks/webpack-61dfc2088ff645f2.js                                     1.58 kB
  └ css/9f9f87cb9c3c04e3.css                                               2.19 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
