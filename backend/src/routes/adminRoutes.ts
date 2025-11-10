import express, { Router } from 'express'
import { PrismaClient } from '@prisma/client';
import { authmiddleware } from '../middleware/authmiddleware';

const app = express();
const client=new PrismaClient();



export default app;