import { NextApiHandler, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

import type { Tag as FolderTag } from "@/types";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { folder_id } = req.query;
    const { name, color } = req.body;
    if (!name || !color) {
      res.status(400).end();
    } else {
      const tag: FolderTag = { name: name, color: color };
      await mongooseConnect();
      const response = await folder.findOneAndUpdate(
        { _id: folder_id },
        { $push: { tags: tag } },
        { returnDocument: "after", upsert: true }
      );
      res.status(200).json(response);
    }
  }
};

export default handler;
