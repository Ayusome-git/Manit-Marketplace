import express from 'express'
import { PrismaClient } from '@prisma/client';
import { authmiddleware } from '../middleware/authmiddleware';
import { messaging } from 'firebase-admin';

const app = express();
const client=new PrismaClient();



app.post("/",authmiddleware,async (req,res)=>{
    //@ts-ignore
    const userId=req.id
    const category= req.body.category;
    const name=req.body.name;
    const description = req.body.description;
    const price = parseInt(req.body.price)
    const productCondition = req.body.productCondition;
    try{
        await client.product.create({
            data: {
                name,
                description,
                category,
                price,
                productCondition,
                sellerId:userId
            }
        })
        res.status(201).json({ message: "Product created" });
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
        res.json({
            response
        })
    }catch(e){
        res.status(404).json({message:"not found"})
    }
})

app.get("/:id",async(req,res)=>{
    const productId=req.params.id
    try{
        const response = client.product.findFirst({
            where:{
                productId
            },
            include:{
                productImages:true
            }
        })
        res.status(200).json({message:"success"})
    }catch(e){
        res.status(404).json({message:"not found"})
    }
})

app.delete("/:id",authmiddleware,async(req,res)=>{
    //@ts-ignore
    const userId= req.id
    const productId=req.params.id
    try{
        const response=await client.product.delete({
            where:{
                productId
            }
        })
        res.status(200).json({message:"deleted"})
    }catch(e){
        res.status(404).json({message:"not found"})
    }
})




export default app;