-- CreateTable
CREATE TABLE `ProductImages` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wishlist` (
    `wishlistId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`wishlistId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductImages` ADD CONSTRAINT `ProductImages_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
