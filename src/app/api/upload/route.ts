import cloudinary from "@/utils/cloudinary";
import { upload } from "@/utils/multer";
import { uploadImage } from "@/utils/upload";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { RequestContext } from "next/dist/server/base-server";
import { NextRequest } from "next/server";

// interface NextApiRequestExtended extends NextApiRequest {
//   file: any;
// }

// const apiRoute = createRouter<NextApiRequestExtended, NextApiResponse>();

// apiRoute.use(upload.single("files") as any);

// apiRoute.post(async (req, res) => {
//   const file = req.file;

//   try {
//     console.log(req, file);
//     const resp = await cloudinary.v2.uploader.upload(file, {
//       folder: "Collab",
//     });

//     return Response.json(
//       {
//         success: true,
//         message: "File(s) uploaded successfully",
//         data: resp.url,
//       },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.log(err);
//     return new Response("An error occurred while uploading file", {
//       status: 400,
//     });
//   }
// });

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as unknown as File;

    const data = await uploadImage(file, "collab-avatars");

    return Response.json(
      {
        success: true,
        message: "File(s) uploaded successfully",
        data: {
          url: data?.url,
        },
        // data: {
        //   url: "http://res.cloudinary.com/destiny01/image/upload/v1714130375/collab-avatars/cfqewkjdysfrmxrwv3mk.png",
        // },
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new Response("An error occurred while uploading file", {
      status: 400,
    });
  }
}
