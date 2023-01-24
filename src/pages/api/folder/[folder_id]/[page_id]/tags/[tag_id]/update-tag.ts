import { NextApiHandler, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

import type { PageTag } from "@/types";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { folder_id, page_id, tag_id } = req.query;
    const { name, color } = req.body;
    if (!name || !color) {
      res.status(400).end();
    } else {
      const update: PageTag = {
        name: name,
        color: color,
      };
      await mongooseConnect();
      const response = await folder.findOneAndUpdate(
        {
          _id: folder_id,
          "pages._id": page_id,
          "pages.tags._id": tag_id,
        },
        { $set: { "pages.$.tags": update } },
        { returnDocument: "after", upsert: true }
      );
      res.status(200).json(response);
    }
  }
};

export default handler;
