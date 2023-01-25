import { NextApiHandler, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

import type { Tag as PageTag } from "@/types";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "POST") {
    const folder_id = req.query.folder_id as string;
    const page_id = req.query._id as string;
    const { name, color } = req.body;
    if (!name || !color) {
      res.status(400).end();
    } else {
      const tag: PageTag = { name: name, color: color };
      await mongooseConnect();
      const response = await folder.findOneAndUpdate(
        { _id: folder_id, "pages._id": page_id },
        { $push: { "pages.$.tags": tag } },
        { returnDocument: "after", upsert: true }
      );
      res.status(200).json(response);
    }
  }
};

export default handler;
