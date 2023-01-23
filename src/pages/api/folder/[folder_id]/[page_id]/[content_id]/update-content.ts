import { NextApiHandler, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { folder_id, page_id, content_id } = req.query;
    const { elem, text } = req.body;
    if (!elem || !text) {
      res.status(400).end();
    } else {
      const update = {
        elem: elem,
        text: text,
      };
      await mongooseConnect();
      const response = await folder.findOneAndUpdate(
        {
          _id: folder_id,
          "pages._id": page_id,
          "pages.content._id": content_id,
        },
        { $set: { content: update } },
        { returnDocument: "after", upsert: true }
      );
      res.status(200).json(response);
    }
  }
};

export default handler;
