/*
  Warnings:

  - The primary key for the `chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `message` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `chat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user1Id` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2Id` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `Chat_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `Chat_senderId_fkey`;

-- DropIndex
DROP INDEX `Chat_receiverId_fkey` ON `chat`;

-- DropIndex
DROP INDEX `Chat_senderId_fkey` ON `chat`;

-- AlterTable
ALTER TABLE `chat` DROP PRIMARY KEY,
    DROP COLUMN `message`,
    DROP COLUMN `receiverId`,
    DROP COLUMN `senderId`,
    DROP COLUMN `timestamp`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `user1Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user2Id` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `ChatMessage` (
    `id` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isRead` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Chat_user1Id_user2Id_key` ON `Chat`(`user1Id`, `user2Id`);

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_user1Id_fkey` FOREIGN KEY (`user1Id`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_user2Id_fkey` FOREIGN KEY (`user2Id`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
