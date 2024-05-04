import multer, { Multer } from "multer";
import path from "path";

const limits = {
  fileSize: 3221225472,
};

const storage = multer.memoryStorage();

function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  console.log(file, "file");
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
}

export const upload = multer({
  storage,
  limits: limits,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
