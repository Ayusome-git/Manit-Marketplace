/*
  Warnings:

  - You are about to drop the `productimages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ratings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `productimages` DROP FOREIGN KEY `ProductImages_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `Ratings_ratedBy_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `Ratings_ratedTo_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `phoneNo` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `productimages`;

-- DropTable
DROP TABLE `ratings`;

-- CreateTable
CREATE TABLE `ProductImage` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rating` (
    `ratingId` INTEGER NOT NULL AUTO_INCREMENT,
    `ratingValue` INTEGER NOT NULL,
    `ratedTo` BIGINT NOT NULL,
    `ratedBy` BIGINT NOT NULL,

    PRIMARY KEY (`ratingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Wishlist_userId_productId_key` ON `Wishlist`(`userId`, `productId`);

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_ratedTo_fkey` FOREIGN KEY (`ratedTo`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_ratedBy_fkey` FOREIGN KEY (`ratedBy`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
