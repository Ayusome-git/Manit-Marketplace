
import multer from "multer";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Request, Response, NextFunction } from "express";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_KEY!,
  api_secret: process.env.CLOUD_SECRET!,
});

//Multer storage (in-memory)
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB/file
});

//Helper: upload buffer to Cloudinary
const uploadToCloudinary = (
  fileBuffer: Buffer,
  filename?: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        timeout: 1200000, // 120s timeout
        resource_type: "image",
        public_id: filename?.split(".")[0], // optional: name without extension
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("No result from Cloudinary"));
        resolve(result);
      }
    );

    //MUST call .end() or stream never finishes
    stream.end(fileBuffer);
  });
};

//Middleware for multiple images
export const uploadImageToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      req.body.imageUrls = [];
      return next();
    }

    const imageUrls: string[] = [];

    for (const file of files) {
      const result = await uploadToCloudinary(file.buffer, file.originalname);
      imageUrls.push(result.secure_url);
    }

    req.body.imageUrls = imageUrls;
    next();
  } catch (err) {
    console.error("Upload middleware error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
};
