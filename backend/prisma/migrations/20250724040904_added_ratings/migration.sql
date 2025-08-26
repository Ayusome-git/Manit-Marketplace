-- CreateTable
CREATE TABLE `Ratings` (
    `ratingId` INTEGER NOT NULL AUTO_INCREMENT,
    `ratingValue` INTEGER NOT NULL,
    `ratedTo` BIGINT NOT NULL,
    `ratedBy` BIGINT NOT NULL,

    PRIMARY KEY (`ratingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_ratedTo_fkey` FOREIGN KEY (`ratedTo`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_ratedBy_fkey` FOREIGN KEY (`ratedBy`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
