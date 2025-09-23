import express from 'express'
import { PrismaClient } from '@prisma/client';
import { authmiddleware } from '../middleware/authmiddleware';

const app = express();
const client=new PrismaClient();



app.post("/",authmiddleware, async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlistItem = await client.wishlist.create({
      data: { userId, productId },
    });
    res.status(200).json(wishlistItem);
  } catch (error) {
    res.status(400).json({ error: "Already in wishlist or invalid data" });
  }
});


app.get("/:userId",authmiddleware, async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await client.wishlist.findMany({
      where: { userId },
      include: {
        product:{
            include:{
                productImages:true
            }
        }
      },
    });
    res.status(200).json(wishlist);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

app.delete("/:wishlistId",authmiddleware, async (req, res) => {
  const { wishlistId } = req.params;
  try {
    await client.wishlist.delete({
      where: { wishlistId: Number(wishlistId) },
    });
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(404).json({ error: "Wishlist item not found" });
  }
});


export default app;