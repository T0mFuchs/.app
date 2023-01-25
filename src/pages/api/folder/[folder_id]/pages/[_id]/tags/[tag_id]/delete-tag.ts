import { NextApiHandler, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const folder_id = req.query.folder_id as string;
    const page_id = req.query._id as string;
    const tag_id = req.query.tag_id as string;
    await mongooseConnect();
    const response = await folder.findOneAndUpdate(
      { _id: folder_id, "pages._id": page_id },
      { $pull: { "pages.$.tags": { _id: tag_id } } },
      { returnDocument: "after", new: true }
    );
    res.status(200).json(response);
  }
};

export default handler;