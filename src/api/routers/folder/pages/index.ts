import { router, procedure } from "@api/trpc";
import { z } from "zod";
import mongooseConnect from "@lib/mongoose-connect";
import { folder } from "@models";

export const folderPagesRouter = router({
  create: procedure
    .input(
      z.object({
        folder_id: z.string().length(24),
        title: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { folder_id, title, color } = input;
      const newPage = {
        title: title,
        color: color,
        tags: [],
        content: [],
        iat: Date.now(),
        eat: Date.now(),
      };
      await mongooseConnect();
      return await folder.findOneAndUpdate(
        {
          _id: folder_id,
        },
        { $push: { pages: newPage } },
        { returnDocument: "after", upsert: true }
      );
    }),
  update: procedure
    .input(
      z.object({
        folder_id: z.string().length(24),
        page_id: z.string().length(24),
        title: z.string(),
        color: z.string(),
        tags: z.array(
          z.object({
            name: z.string(),
            color: z.string(),
          })
        ),
        content: z.array(
          z.object({
            elem: z.string(),
            text: z.string(),
          })
        ),
        iat: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { folder_id, page_id, title, color, tags, content, iat } = input;
      const update = {
        title: title,
        color: color,
        tags: tags,
        content: content,
        iat: iat,
        eat: Date.now(),
      };
      await mongooseConnect();
      return await folder.findOneAndUpdate(
        {
          _id: folder_id,
          "pages._id": page_id,
        },
        { $set: { "folder.$.pages": update } },
        { returnDocument: "after", upsert: true }
      );
    }),
  delete: procedure
    .input(
      z.object({
        folder_id: z.string().length(24),
        page_id: z.string().length(24),
      })
    )
    .mutation(async ({ input }) => {
      const { folder_id, page_id } = input;
      await mongooseConnect();
      return await folder.findOneAndUpdate(
        {
          _id: folder_id,
        },
        { $pull: { pages: { _id: page_id } } },
        { returnDocument: "after" }
      );
    }),
});
