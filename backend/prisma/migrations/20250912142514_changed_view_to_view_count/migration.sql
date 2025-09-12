/*
  Warnings:

  - You are about to drop the column `views` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `views`,
    ADD COLUMN `viewCount` INTEGER NOT NULL DEFAULT 0;
