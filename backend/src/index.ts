import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { authmiddleware} from './authmiddleware';

const client = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());



app.post("/api/v1/signin",async(req,res)=>{
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


app.get("/api/v1/profile",authmiddleware, async(req,res)=>{
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


app.post("/api/v1/products",authmiddleware,async (req,res)=>{
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

app.get("/api/v1/products",authmiddleware,(req,res)=>{
    
})


app.listen(3000);

