import express from 'express'
import { PrismaClient } from '@prisma/client';
import { authmiddleware } from '../authmiddleware';

const app = express();
const client=new PrismaClient();

app.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const username = req.body.name;
    const id=parseInt(req.body.id);
    const userExist= await client.user.findFirst({
        where:{
            email:email
        }
    })
    try{
        if(!userExist){
            await client.user.create({
                data: {
                    userId:id,
                    email: email,
                    username: username
                }
            })
            res.status(201).json({ message: "User created" });
        } else {
            res.sendStatus(200).json({message:"Login Successfull"});
        }
    }catch(e){
        console.log(e);
        res.status(500).json({ error: "Internal server error" });
    }
})


app.get("/me",authmiddleware, async(req,res)=>{
    try {
        // @ts-ignore
        const data = req.data;
        const id=data.email?.split("@")[0];
        const userId=parseInt(id);
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const user = await client.user.findUnique({
            where: { userId: userId },
            select: { userId: true, email: true, username: true }
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({
            userId:user.userId.toString(),
            email: user.email,
            username:user.username
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
})


export default app;