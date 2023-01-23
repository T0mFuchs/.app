import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { folder } from "@/models";
import mongooseConnect from "@/lib/mongoose-connect";
import { Folder } from "@/types";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "PUT") {
    const { _id, name, pages, iat } = req.body;
    if (!_id || !name || !pages || !iat) {
      res.status(400).end();
    } else {
      await mongooseConnect();
      const updatedFolder: Folder = {
        _id: _id,
        name: name,
        pages: pages,
        iat: iat,
        eat: Date.now(),
      };
      await folder.findOneAndUpdate({ _id: _id }, updatedFolder, {
        returnDocument: "after",
        upsert: true,
      });
      res.status(200).end();
    }
  }
};

export default handler;
