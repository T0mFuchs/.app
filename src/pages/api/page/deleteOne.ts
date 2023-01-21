import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { page } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "DELETE") {
    const { _id } = req.body;
    await mongooseConnect();
    await page.findOneAndDelete({ _id: _id });
    res.status(200).end();
  }
};

export default handler;
