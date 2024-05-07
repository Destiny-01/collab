import { uploadImage } from "@/utils/upload";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as unknown as File;
    console.log(file, "ff");

    const data = await uploadImage(file, "collab-avatars");
    console.log(data);

    return Response.json(
      {
        success: true,
        message: "File(s) uploaded successfully",
        data,
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
