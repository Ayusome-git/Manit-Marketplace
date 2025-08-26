import express from 'express'
import { PrismaClient } from '@prisma/client';
import { authmiddleware } from '../authmiddleware';

const app = express();
const client=new PrismaClient();



app.post("/",authmiddleware,async (req,res)=>{
    //@ts-ignore
    const data = req.data;
    const id=data.email?.split("@")[0];
    const userId=parseInt(id);
    const category= req.body.category;
    const name=req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const productCondition = req.body.productCondition;
    const sellerId = userId
    try{
        await client.product.create({
            data: {
                category: category,
                name,
                description,
                price,
                productCondition,
                seller: {
                    connect: { userId: sellerId }
                }
            }
        })
        res.status(201).json({ message: "Product created" });
    }catch(e){
        res.status(500).json({error:"internal server error"});
    }
})

app.get("/",authmiddleware,(req,res)=>{
    
})




export default app;