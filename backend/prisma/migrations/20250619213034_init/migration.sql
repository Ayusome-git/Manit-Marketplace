-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `phoneNo` INTEGER NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
