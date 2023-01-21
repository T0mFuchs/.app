import { NextApiHandler, NextApiResponse } from "next";
import { page } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "POST") {
    await mongooseConnect();
    const { title, tags, content } = req.body;
    const timestamp = Date.now();
    const newPage = new page({
      title: title,
      tags: tags,
      content: content,
      iat: timestamp,
      eat: timestamp,
    });
    await newPage.save().then(() => res.status(200).end());
  }
};

export default handler;
