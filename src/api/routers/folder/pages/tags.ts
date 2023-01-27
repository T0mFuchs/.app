import { router, procedure } from "@api/trpc";
import { z } from "zod";
import mongooseConnect from "@lib/mongoose-connect";
import { folder } from "@models";

export const folderPagesTagsRouter = router({
  create: procedure
    .input(
      z.object({
        folder_id: z.string().length(24),
        page_id: z.string().length(24),
        tag: z.object({
          name: z.string(),
          color: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { folder_id, page_id, tag } = input;
      await mongooseConnect();
      return await folder.findOneAndUpdate(
        {
          _id: folder_id,
          "pages._id": page_id,
        },
        { $push: { "pages.$.tags": tag } },
        { returnDocument: "after", upsert: true }
      );
    }),
  update: procedure
    .input(
      z.object({
        folder_id: z.string().length(24),
        page_id: z.string().length(24),
        tag_id: z.string().length(24),
        tag: z.object({
          name: z.string(),
          color: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { folder_id, page_id, tag_id, tag } = input;
      await mongooseConnect();
      return await folder.findOneAndUpdate(
        {
          _id: folder_id,
          "pages._id": page_id,
          "pages.tags._id": tag_id,
        },
        { $set: { "pages.$.tags": tag } },
        { returnDocument: "after", upsert: true }
      );
    }),
  delete: procedure
    .input(
      z.object({
        folder_id: z.string().length(24),
        page_id: z.string().length(24),
        tag_id: z.string().length(24),
      })
    )
    .mutation(async ({ input }) => {
      const { folder_id, page_id, tag_id } = input;
      await mongooseConnect();
      return await folder.findOneAndUpdate(
        {
          _id: folder_id,
          "pages._id": page_id,
        },
        { $pull: { "pages.$.tags": { _id: tag_id } } },
        { returnDocument: "after", upsert: true }
      );
    }),
});
