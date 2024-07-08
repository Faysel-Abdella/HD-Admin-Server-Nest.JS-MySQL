/*
  Warnings:

  - Added the required column `reviewId` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EvaluationItem` ADD COLUMN `reviewId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Review` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `sigungu` VARCHAR(191) NOT NULL,
    `detailed_address` VARCHAR(191) NULL,
    `residence_year` INTEGER NULL,
    `comprehensive_opinion` VARCHAR(191) NULL,
    `photos` JSON NULL,
    `residence_proof_document` VARCHAR(191) NULL,
    `rating` DOUBLE NULL,
    `usage_fee` DECIMAL(10, 2) NULL DEFAULT 0,
    `view_count` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'WAITING', 'APPROVED', 'REJECTED', 'WAITING_FOR_UPDATE', 'WAITING_FOR_RESIDENCE_VERIFICATION', 'WAITING_AFTER_REJECTION') NOT NULL DEFAULT 'DRAFT',
    `is_exposed` BOOLEAN NOT NULL DEFAULT true,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NULL,
    `evaluation_items` JSON NULL,

    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `commentId` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `adminId` INTEGER NULL,
    `comment` VARCHAR(191) NOT NULL,
    `comment_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_exposed` BOOLEAN NOT NULL DEFAULT true,
    `admin_processed_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NULL,
    `userId` INTEGER NULL,
    `adminId` INTEGER NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `uploaded_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_exposed` BOOLEAN NOT NULL DEFAULT true,
    `admin_processed_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`reviewId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`adminId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`reviewId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`adminId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvaluationItem` ADD CONSTRAINT `EvaluationItem_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`reviewId`) ON DELETE CASCADE ON UPDATE CASCADE;
