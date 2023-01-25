import { NextApiHandler, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "POST") {
    const folder_id = req.query.folder_id as string;
    const page_id = req.query._id as string;
    const { elem, text } = req.body;
    if (!elem || !text) {
      res.status(400).end();
    } else {
      const content = { elem: elem, text: text };
      await mongooseConnect();
      const response = await folder.findOneAndUpdate(
        { _id: folder_id, "pages._id": page_id },
        { $push: { "pages.$.content": content } },
        { returnDocument: "after", upsert: true }
      );
      res.status(200).json(response);
    }
  }
};

export default handler;
