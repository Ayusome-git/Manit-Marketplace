/*
  Warnings:

  - You are about to drop the `chatmember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chatmessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chatroom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `chatmember` DROP FOREIGN KEY `ChatMember_chatRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `chatmember` DROP FOREIGN KEY `ChatMember_userId_fkey`;

-- DropForeignKey
ALTER TABLE `chatmessage` DROP FOREIGN KEY `ChatMessage_chatRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `chatmessage` DROP FOREIGN KEY `ChatMessage_senderId_fkey`;

-- DropTable
DROP TABLE `chatmember`;

-- DropTable
DROP TABLE `chatmessage`;

-- DropTable
DROP TABLE `chatroom`;

-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `receiverId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
