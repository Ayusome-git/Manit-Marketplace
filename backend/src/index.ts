import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes'

const client = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/product", productRoutes);




app.listen(3000);

