import { NextApiHandler, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { _id } = req.query;
    const { title } = req.body;
    const timestamp = Date.now();
    const parent_doc = new folder();
    const newPage = parent_doc.pages.create({
      title: title,
      tags: [],
      content:[],
      iat: timestamp,
      eat: timestamp,
    });
    await mongooseConnect();
    const response = await folder.findOneAndUpdate(
      { _id: _id },
      { $push: { pages: newPage } },
      { returnDocument: "after", upsert: true, returnOriginal: false }
    );
    res.status(200).json(response);
  }
};

export default handler;
