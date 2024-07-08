/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminId` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `admin_processed_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `comment_date` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `is_exposed` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `EvaluationItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `display_order` on the `EvaluationItem` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `EvaluationItem` table. All the data in the column will be lost.
  - You are about to drop the column `question_text` on the `EvaluationItem` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `EvaluationItem` table. All the data in the column will be lost.
  - You are about to drop the column `score_0_text` on the `EvaluationItem` table. All the data in the column will be lost.
  - You are about to drop the column `score_1_text` on the `EvaluationItem` table. All the data in the column will be lost.
  - You are about to drop the column `score_3_text` on the `EvaluationItem` table. All the data in the column will be lost.
  - You are about to drop the column `score_5_text` on the `EvaluationItem` table. All the data in the column will be lost.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comprehensive_opinion` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `detailed_address` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `is_exposed` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `registration_date` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `residence_proof_document` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `residence_year` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `usage_fee` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `view_count` on the `Review` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailedDescription` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayOrder` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionText` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score0Text` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score1Text` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score3Text` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score5Text` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selectedScore` to the `EvaluationItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comprehensiveOpinion` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailedAddress` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residenceYear` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usageFee` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `EvaluationItem` DROP FOREIGN KEY `EvaluationItem_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_userId_fkey`;

-- AlterTable
ALTER TABLE `Admin` DROP PRIMARY KEY,
    DROP COLUMN `adminId`,
    ADD COLUMN `adminId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`adminId`);

-- AlterTable
ALTER TABLE `Comment` DROP PRIMARY KEY,
    DROP COLUMN `adminId`,
    DROP COLUMN `admin_processed_at`,
    DROP COLUMN `comment_date`,
    DROP COLUMN `commentId`,
    DROP COLUMN `is_exposed`,
    DROP COLUMN `reviewId`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `userId`,
    ADD COLUMN `adminId` INTEGER NULL,
    ADD COLUMN `adminProcessedAt` DATETIME(3) NULL,
    ADD COLUMN `commentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `commentId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `isExposed` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `reviewId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`commentId`);

-- AlterTable
ALTER TABLE `EvaluationItem` DROP PRIMARY KEY,
    DROP COLUMN `display_order`,
    DROP COLUMN `item_id`,
    DROP COLUMN `question_text`,
    DROP COLUMN `reviewId`,
    DROP COLUMN `score_0_text`,
    DROP COLUMN `score_1_text`,
    DROP COLUMN `score_3_text`,
    DROP COLUMN `score_5_text`,
    ADD COLUMN `detailedDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `displayOrder` INTEGER NOT NULL,
    ADD COLUMN `itemId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `questionText` VARCHAR(191) NOT NULL,
    ADD COLUMN `reviewId` INTEGER NOT NULL,
    ADD COLUMN `score0Text` VARCHAR(191) NOT NULL,
    ADD COLUMN `score1Text` VARCHAR(191) NOT NULL,
    ADD COLUMN `score3Text` VARCHAR(191) NOT NULL,
    ADD COLUMN `score5Text` VARCHAR(191) NOT NULL,
    ADD COLUMN `selectedScore` INTEGER NOT NULL,
    ADD PRIMARY KEY (`itemId`);

-- AlterTable
ALTER TABLE `Review` DROP PRIMARY KEY,
    DROP COLUMN `comprehensive_opinion`,
    DROP COLUMN `detailed_address`,
    DROP COLUMN `is_exposed`,
    DROP COLUMN `registration_date`,
    DROP COLUMN `residence_proof_document`,
    DROP COLUMN `residence_year`,
    DROP COLUMN `reviewId`,
    DROP COLUMN `usage_fee`,
    DROP COLUMN `userId`,
    DROP COLUMN `view_count`,
    ADD COLUMN `comprehensiveOpinion` VARCHAR(191) NOT NULL,
    ADD COLUMN `detailedAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `isExposed` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `registrationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `residenceProofDocument` VARCHAR(191) NULL,
    ADD COLUMN `residenceYear` VARCHAR(191) NOT NULL,
    ADD COLUMN `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `usageFee` DOUBLE NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD COLUMN `viewCount` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`reviewId`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `userId`,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `adminId` INTEGER NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `isExposed` BOOLEAN NOT NULL,
    `processedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`reviewId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`adminId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`reviewId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`adminId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvaluationItem` ADD CONSTRAINT `EvaluationItem_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`reviewId`) ON DELETE CASCADE ON UPDATE CASCADE;
