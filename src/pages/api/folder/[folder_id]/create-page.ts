import { NextApiHandler, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { folder_id } = req.query;
    const { title, color, tags, content } = req.body;
    if (!title || !color || !tags || !content) {
      return res.status(400).end();
    } else {
      const timestamp = Date.now();
      const parent_doc = new folder();
      const newPage = parent_doc.pages.create({
        title: title,
        color: color,
        tags: tags,
        content: content,
        iat: timestamp,
        eat: timestamp,
      });
      await mongooseConnect();
      const response = await folder.findOneAndUpdate(
        { _id: folder_id },
        { $push: { pages: newPage } },
        { returnDocument: "after", upsert: true }
      );
      res.status(200).json(response);
    }
  }
};

export default handler;
