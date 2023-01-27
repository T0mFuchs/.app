import { router } from "@api/trpc";
import { folderRouter } from "./folder/";
import { folderTagsRouter } from "./folder/tags";
import { folderPagesRouter } from "./folder/pages";
import { folderPagesTagsRouter } from "./folder/pages/tags";
import { folderPagesContentRouter } from "./folder/pages/content";

export const appRouter = router({
  folder: folderRouter,
  folderTags: folderTagsRouter,
  folderPages: folderPagesRouter,
  folderPagesTags: folderPagesTagsRouter,
  folderPagesContent: folderPagesContentRouter,
});

export type AppRouter = typeof appRouter;
