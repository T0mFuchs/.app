import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { page } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";
import { Page } from "@/types";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "PUT") {
    const { _id, title, content } = req.body;
    await mongooseConnect();
    const timestamp = Date.now();
    const updatedPage: Page = {
      _id: _id,
      title: title,
      eat: timestamp,
      content: content,
    };
    await page.findOneAndUpdate({ _id: _id }, updatedPage, {
      returnDocument: "after",
      upsert: true,
      returnOriginal: false,
      new: false,
    });
    res.status(200).end();
  }
};

export default handler;
