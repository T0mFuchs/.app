import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { name } = req.body;
    await mongooseConnect();
    const timestamp = Date.now();
    const newFolder = new folder({
      name: name,
      iat: timestamp,
      eat: timestamp,
    });
    await newFolder.save().then(() => res.status(200).end());
  }
};

export default handler;
