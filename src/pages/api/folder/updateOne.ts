import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";
import { Folder } from "@/types";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "PUT") {
    const { _id, name, pages } = req.body;
    await mongooseConnect();
    const timestamp = Date.now();
    const updatedFolder: Folder = {
      _id: _id,
      name: name,
      eat: timestamp,
      pages: pages,
    };
    await folder.findOneAndUpdate({ _id: _id }, updatedFolder, {
      returnDocument: "after",
      upsert: true,
      returnOriginal: false,
      new: false,
    });
    res.status(200).end();
  }
};

export default handler;
