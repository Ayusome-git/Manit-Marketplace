import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";

const app = Router();
const prisma = new PrismaClient();

app.use(express.json());


app.post("/create", async (req, res) => {
  const { user1Id, user2Id } = req.body;

  try {
    let chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { user1Id, user2Id },
          { user1Id: user2Id, user2Id: user1Id },
        ],
      },
      include: {
        user1: true,
        user2: true,
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: { user1Id, user2Id },
        include: { user1: true, user2: true },
      });
    }

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create or fetch chat" });
  }
});


app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: true,
        user2: true,
        messages: {
          orderBy: { sentAt: "desc" },
          take: 1, 
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user chats" });
  }
});

app.get("/:chatId/messages", async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await prisma.chatMessage.findMany({
      where: { chatId },
      include: { sender: true },
      orderBy: { sentAt: "asc" },
    });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default app;
