
import multer from "multer";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Request, Response, NextFunction } from "express";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_KEY!,
  api_secret: process.env.CLOUD_SECRET!,
});


const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
});


const uploadToCloudinary = (
  fileBuffer: Buffer,
  filename?: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        timeout: 1200000, 
        resource_type: "image",
        public_id: filename?.split(".")[0], 
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("No result from Cloudinary"));
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};


export const uploadImageToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filesArray = req.files as Express.Multer.File[] | undefined;
    const singleFile = (req as any).file as Express.Multer.File | undefined;

    const files: Express.Multer.File[] = [];
    if (Array.isArray(filesArray) && filesArray.length > 0) {
      files.push(...filesArray);
    } else if (singleFile) {
      files.push(singleFile);
    }

    if (files.length === 0) {
      req.body.imageUrls = [];
      return next();
    }

    const imageUrls: string[] = [];

    for (const file of files) {
      const result = await uploadToCloudinary(file.buffer, file.originalname);
      imageUrls.push(result.secure_url);
    }

    req.body.imageUrls = imageUrls;
    return next();
  } catch (err) {
    console.error("Upload middleware error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
};
