import { NextApiHandler, NextApiResponse } from "next";
import { page } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id } = req.query;
    await mongooseConnect();
    const response = await (await page.find({ _id: id })).find((elem) => elem);
    res.status(200).json(response);
  }
};

export default handler;
