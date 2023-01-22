import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    await mongooseConnect();
    const folders = await folder.find({}).populate({ path: "pages" });
    res.status(200).json(folders);
  }
};

export default handler;
