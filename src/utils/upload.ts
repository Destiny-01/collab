import cloudinary from "./cloudinary";

export const uploadImage = async (
  file: File,
  folder: string
): Promise<cloudinary.UploadApiResponse | undefined> => {
  const fileBuffer = await file.arrayBuffer();
  var mime = file.type;
  var encoding = "base64";
  var base64Data = Buffer.from(fileBuffer).toString("base64");
  var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  return new Promise((resolve, reject) => {
    var result = cloudinary.v2.uploader
      .upload(fileUri, { invalidate: true })
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
