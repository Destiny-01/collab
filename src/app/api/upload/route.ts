import cloudinary from "@/app/utils/cloudinary";
import { upload } from "@/app/utils/multer";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

interface NextApiRequestExtended extends NextApiRequest {
  file: "";
}

const apiRoute = createRouter<NextApiRequestExtended, NextApiResponse>();

apiRoute.use(upload.single("file") as any);

apiRoute.post(async (req, res) => {
  const file = req.file;
  const { folder } = req.body;

  try {
    const resp = await cloudinary.v2.uploader.upload(file, {
      folder,
    });

    return Response.json(
      {
        success: true,
        message: "File(s) uploaded successfully",
        data: resp.url,
      },
      { status: 201 }
    );
  } catch (err) {
    return new Response("An error occurred while uploading file", {
      status: 400,
    });
  }
});

export default apiRoute;
