import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client';
import { authmiddleware } from '../middleware/authmiddleware';
import { messaging } from 'firebase-admin';
import { upload, uploadImageToCloudinary } from "../middleware/uploadMiddleware";

const app = Router();
const client=new PrismaClient();



app.post("/",authmiddleware,upload.array("images",6),uploadImageToCloudinary,async (req,res)=>{
    //@ts-ignore
    const userId=req.id
    const category= req.body.category;
    const name=req.body.name;
    const description = req.body.description;
    const price = parseInt(req.body.price)
    const productCondition = req.body.productCondition;
    const imageUrls=req.body.imageUrls;
    try{
        await client.product.create({
            data: {
                name,
                description,
                category,
                price,
                productCondition,
                sellerId:userId,
                productImages:{
                    create:imageUrls.map((url:string)=>({imageUrl:url}))
                }
            }
        })
        res.status(200).json({ message: "Product created" });
    }catch (e) {
        console.error("Error creating product:", e);
        if (e instanceof Error) {
            res.status(500).json({ error: e.message });
        } else {
            res.status(500).json({ error: "Unknown error" });
        }
    }
})
app.get("/all",async(req,res)=>{
    try{
        const response=await client.product.findMany({
            include:{
                productImages:true
            }
        })
        res.status(200).json(response)
    }catch(e){
        res.status(404).json({message:"not found"})
    }
})
app.get("/featured",async(req,res)=>{
    try{
        const response=await client.product.findMany({
            orderBy:{viewCount:"desc"},
            take:8,
            include:{
                productImages:true
            }
        })
        
        res.status(200).json(response)
    }catch(e){
        res.status(404).json({message:"not found"})
    }
})
app.get("/recent",async(req,res)=>{
    try{
        const response=await client.product.findMany({
            orderBy:{listedAt:"desc"},
            take:8,
            include:{
                productImages:true
            }
        })
        
        res.status(200).json(response)
    }catch(e){
        res.status(404).json({message:"not found"})
    }
})
app.get("/myads",authmiddleware,async(req,res)=>{
    //@ts-ignore
    const userId=req.id
    try{
        const products= await client.product.findMany({
            where: {
                sellerId: userId
            },
            include:{
                productImages:true
            }
        })
        res.status(200).json(products)
    }catch(e){
        res.status(401).json({message:"error while fetching ads"})
    }
})
app.get("/:id",async(req,res)=>{
    const productId=req.params.id
    try{
        const product = await client.product.findFirst({
            where:{
                productId:productId
            },
            include:{
                productImages:true,
                seller:{
                    select:{
                        userId:true,
                        username:true,
                        profilePhoto:true
                    }
                }
            }
        })
        res.status(200).json(product);
    }catch(e){
        res.status(404).json({message:"not found"})
    }
})

app.delete("/:productId",authmiddleware,async(req,res)=>{
    //@ts-ignore
    const userId= req.id
    const productId=req.params.productId
    try{
        const response=await client.product.delete({
            where:{
                productId,
                sellerId:userId
            }
        })
        res.status(200).json({message:"deleted"})
    }catch(e){
        res.status(404).json({message:"not found"})
    }
})

app.post("/:id/viewCount", async (req, res) => {
  try {
    const { id } = req.params;
    await client.product.update({
      where: { productId: id },
      data: { viewCount: { increment: 1 } },
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update view count" });
  }
});
app.put("/:productId", authmiddleware, upload.array("images", 6), uploadImageToCloudinary, async (req, res) => {
    const productId = req.params.productId;
    //@ts-ignore
    const userId = req.id;
    let existingImages = req.body.existingImages || [];
    if (typeof existingImages === "string") existingImages = [existingImages];
    let imageUrls = req.body.imageUrls;
    if (!imageUrls) {
      imageUrls = [];
    } else if (typeof imageUrls === "string") {
      imageUrls = imageUrls ? [imageUrls] : [];
    }
    imageUrls = imageUrls.filter((url:string) => url && url.trim() !== "");
    try {
        const product = await client.product.findUnique({
            where: { productId, sellerId: userId },
            include: { productImages: true },
        });
        if (!product) {
          res.status(404).json({ message: "Product not found" });
          return;
        }
        const imagesToDelete = product.productImages.filter(
            (img) => !existingImages.includes(img.imageUrl)
        );
        await client.productImage.deleteMany({
            where: { imageId: { in: imagesToDelete.map((img) => img.imageId) } },
        });
        const updatedProduct = await client.product.update({
            where: { productId, sellerId: userId },
            data: {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: parseInt(req.body.price),
                productCondition: req.body.productCondition,
                productImages: imageUrls.length
                  ? { create: imageUrls.map((url:string) => ({ imageUrl: url })) }
                  : undefined,
            },
            include: { productImages: true },
        });
        res.status(200).json(updatedProduct);
    } catch (e) {
        console.error(e);
        res.status(400).json({ message: "Failed to update Product" });
    }
})


export default app;