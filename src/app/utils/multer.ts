import multer from "multer";

const limits = {
  fileSize: 3221225472,
};

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: limits,
});
