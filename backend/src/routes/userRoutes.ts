import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client';
import { authmiddleware } from '../middleware/authmiddleware';

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

app.put("/",authmiddleware,async(req,res)=>{
    //@ts-ignore
    const userId=req.id
    const hostelNo=req.body.hostelNo
    const description = req.body.description;
    const profilePhoto = req.body.profilePhoto;
    if(!userId){
        res.status(401).json({error:"unauthorized"})
    }
    try{
        const update = await client.user.update({
            where: {
                userId: userId
            },
            data:{
                hostelNo,
                description,
                profilePhoto
            }
        })
        res.status(200).json({message:"updated"})
    }catch(e){
        res.status(500).json({ error: e });
    }
})


export default app;