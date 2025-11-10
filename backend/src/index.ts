import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes'
import wishlistRoutes from './routes/wishlistRoutes'
import chatRoutes from './routes/chatRoutes'
import adminRoutes from './routes/adminRoutes'

const client = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/wishlist", wishlistRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoutes);




app.listen(3000);

