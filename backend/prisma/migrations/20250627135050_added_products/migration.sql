-- AlterTable
ALTER TABLE `user` ADD COLUMN `hostelNo` INTEGER NULL;

-- CreateTable
CREATE TABLE `Product` (
    `productId` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `productCondition` VARCHAR(191) NOT NULL,
    `listedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sellerId` BIGINT NOT NULL,

    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
