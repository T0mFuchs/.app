import { NextApiHandler, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { folder_id, page_id } = req.query;
    await mongooseConnect();
    const response = await folder.findOneAndUpdate(
      { _id: folder_id },
      { $pull: { pages: { _id: page_id } } },
      { new: true, returnDocument: "after" }
    );
    res.status(200).json(response);
  }
};

export default handler;
