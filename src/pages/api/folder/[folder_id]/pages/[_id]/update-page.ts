import { NextApiHandler, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const folder_id = req.query.folder_id as string;
    const page_id = req.query._id as string;
    const { title, color, tags, content, iat } = req.body;
    if (!title || !color || !tags || !content || !iat) {
      res.status(400).end();
    } else {
      const update = {
        title: title,
        color: color,
        tags: tags,
        content: content,
        iat: iat,
        eat: Date.now(),
      };
      await mongooseConnect();
      const response = await folder.findOneAndUpdate(
        { _id: folder_id, "pages._id": page_id },
        { $set: { pages: update } },
        { returnDocument: "after", upsert: true }
      );
      res.status(200).json(response);
    }
  }
};

export default handler;
