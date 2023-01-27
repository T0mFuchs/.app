import { router, procedure } from "@api/trpc";
import { z } from "zod";
import mongooseConnect from "@lib/mongoose-connect";
import { folder } from "@models";

export const folderRouter = router({
  find: procedure.input(z.object({})).query(async () => {
    await mongooseConnect();
    return await folder.find({}).populate("pages");
  }),
  create: procedure
    .input(
      z.object({
        name: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, color } = input;

      const timestamp = Date.now();
      const newFolder = new folder({
        name: name,
        color: color,
        iat: timestamp,
        eat: timestamp,
        type: "folder",
      });

      await mongooseConnect();
      return await newFolder.save();
    }),
  update: procedure
    .input(
      z.object({
        _id: z.string().length(24),
        name: z.string(),
        color: z.string(),
        tags: z
          .array(
            z.object({
              _id: z.string().length(24),
              name: z.string(),
              color: z.string(),
            })
          )
          .nullish(),
        pages: z
          .array(
            z.object({
              _id: z.string().length(24),
              title: z.string(),
              color: z.string(),
              tags: z
                .array(
                  z.object({
                    _id: z.string().length(24),
                    name: z.string(),
                    color: z.string(),
                  })
                )
                .nullish(),
              content: z
                .array(
                  z.object({
                    _id: z.string().length(24),
                    elem: z.string(),
                    text: z.string(),
                  })
                )
                .nullish(),
              iat: z.number(),
              eat: z.number(),
            })
          )
          .nullish(),
        iat: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { _id, name, color, tags, pages, iat } = input;

      const updatedFolder = {
        _id: _id,
        name: name,
        color: color,
        tags: tags,
        pages: pages,
        iat: iat,
        eat: Date.now(),
      };

      await mongooseConnect();
      return await folder.findOneAndUpdate({ _id: _id }, updatedFolder, {
        returnDocument: "after",
        upsert: true,
      });
    }),
  delete: procedure
    .input(
      z.object({
        _id: z.string().length(24),
      })
    )
    .mutation(async ({ input }) => {
      const { _id } = input;
      await mongooseConnect();
      return await folder.findOneAndDelete(
        { _id: _id },
        { returnDocument: "after" }
      );
    }),
});
