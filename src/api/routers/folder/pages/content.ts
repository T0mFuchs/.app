import { router, procedure } from "@api/trpc";
import { z } from "zod";
import mongooseConnect from "@lib/mongoose-connect";
import { folder } from "@models";

export const folderPagesContentRouter = router({
  create: procedure
    .input(
      z.object({
        folder_id: z.string().length(24),
        page_id: z.string().length(24),
        content: z.object({
          elem: z.string(),
          text: z.string(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { folder_id, page_id, content } = input;
      await mongooseConnect();
      return await folder.findOneAndUpdate(
        {
          _id: folder_id,
          "pages._id": page_id,
        },
        { $push: { "pages.$.content": content } },
        { returnDocument: "after", upsert: true }
      );
    }),
  update: procedure
    .input(
      z.object({
        folder_id: z.string().length(24),
        page_id: z.string().length(24),
        content: z.array(
          z.object({
            elem: z.string(),
            text: z.string(),
            _id: z.string().length(24),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { folder_id, page_id, content } = input;
      await mongooseConnect();
      return await folder.findOneAndUpdate(
        {
          _id: folder_id,
          "pages._id": page_id,
        },
        { $set: { "pages.$.content": content } },
        { returnDocument: "after", upsert: true }
      );
    }),
  delete: procedure
    .input(
      z.object({
        folder_id: z.string().length(24),
        page_id: z.string().length(24),
        content_id: z.string().length(24),
      })
    )
    .mutation(async ({ input }) => {
      const { folder_id, page_id, content_id } = input;
      await mongooseConnect();
      return await folder.findOneAndUpdate(
        {
          _id: folder_id,
          "pages._id": page_id,
        },
        { $pull: { "pages.$.content": { _id: content_id } } },
        { returnDocument: "after", upsert: true }
      );
    }),
});
