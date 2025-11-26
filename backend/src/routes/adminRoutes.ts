import express from 'express'
import { authmiddleware } from '../middleware/authmiddleware';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const client = new PrismaClient();

router.get("/products", authmiddleware, async (req, res) => {
 try {
  // const resUser = await client.user.findMany()

  const resProduct = await client.product.findMany({
   include: {
    productImages: true
   }
  })

  console.log(resProduct)
  res.status(200).json({ products: resProduct });
 }
 catch (e) {
  console.log("Error admin products", e);
 }
})

router.get("/users", authmiddleware, async (req, res) => {
 try {
  const resUser = await client.user.findMany()

  console.log(resUser)
  res.status(200).json({ users: resUser });
 }
 catch (e) {
  console.log("Error admin users", e);
 }
})


export default router;