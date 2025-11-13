import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client';
import { authmiddleware } from '../middleware/authmiddleware';
import { upload, uploadImageToCloudinary } from '../middleware/uploadMiddleware';

const app = express();
const client=new PrismaClient();

app.post("/signin",authmiddleware,async(req,res)=>{
    const email = req.body.email;
    const username = req.body.username;
    //@ts-ignore
    const id=req.id;
    const userExist= await client.user.findFirst({
        where:{
            userId:id
        }
    })
    try{
        if(!userExist){
            await client.user.create({
                data: {
                    userId:id,
                    email,
                    username
                }
            })
            res.status(201).json({ message: "User created" });
            return;
        } else {
            res.status(200).json({message:"Login Successfull"});
        }
    }catch(e){
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
})


app.get("/me",authmiddleware, async(req,res)=>{
    try {
        //@ts-ignore
        const userId=req.id
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const user = await client.user.findUnique({
            where: { userId: userId },
        });
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get("/seller/:id",async(req,res)=>{
    const userId=req.params.id;
    try{
    const seller = await client.user.findUnique({
        where:{userId:userId},
        include:{
            products:{
                include:{
                    productImages:true
                }
            }
        }
    })
    res.status(200).json(seller)
    }catch(e){
        
    }
})

app.put("/",authmiddleware,upload.single("profilePhoto"),uploadImageToCloudinary,async (req, res) => {
        //@ts-ignore
        const userId = req.id;
        const uploadedUrls = (req.body.imageUrls as string[] | undefined) ?? [];
        const hostelNo = req.body.hostelNo;
        const description = req.body.description;
        const profilePhoto = uploadedUrls.length > 0 ? uploadedUrls[0] : req.body.profilePhoto;
        try {
            const update = await client.user.update({
                where: {
                    userId: userId,
                },
                data: {
                    hostelNo,
                    description,
                    profilePhoto,
                },
            });
            res.status(200).json({ message: "updated", user: update });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e });
        }
    }
);


export default app;