import express from "express";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*"}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const prisma = new PrismaClient();

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  socket.on("register", (userId: string) => {
    if (!userId) return;
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send_message", async (data: {
    chatId: string;
    senderId: string;
    receiverId: string;
    content: string;
  }) => {
    const { chatId, senderId, receiverId, content } = data || {};
    if (!chatId || !senderId || !content) return;

    try {
      const message = await prisma.chatMessage.create({
        data: { chatId, senderId, content },
        include: { sender: true },
      });

      await prisma.chat.update({
        where: { id: chatId },
        data: { updatedAt: new Date() },
      });

      const receiverSocket = receiverId ? onlineUsers.get(receiverId) : undefined;
      if (receiverSocket) {
        io.to(receiverSocket).emit("receive_message", message);
      }
      io.to(socket.id).emit("message_sent", message);
    } catch (err) {
      io.to(socket.id).emit("message_error", { error: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});


server.listen(5000);
