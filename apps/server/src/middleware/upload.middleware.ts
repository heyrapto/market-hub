import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const ALLOWED_MIME_TYPES: string[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName: string =
      Date.now() + "-" + file.originalname.replace(/\s/g, "-");

    cb(null, uniqueName);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  const isAllowed: boolean = ALLOWED_MIME_TYPES.includes(file.mimetype);

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, png, webp, gif) are allowed"));
  }
};

export const upload: multer.Multer = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
});
