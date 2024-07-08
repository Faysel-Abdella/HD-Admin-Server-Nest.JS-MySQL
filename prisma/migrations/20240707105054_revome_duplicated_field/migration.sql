/*
  Warnings:

  - You are about to drop the column `evaluation_items` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `useruserId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `comprehensive_opinion` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `detailed_address` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `residence_proof_document` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `residence_year` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_useruserId_fkey`;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `evaluation_items`,
    DROP COLUMN `useruserId`,
    MODIFY `comprehensive_opinion` VARCHAR(191) NOT NULL,
    MODIFY `detailed_address` VARCHAR(191) NOT NULL,
    MODIFY `residence_proof_document` VARCHAR(191) NOT NULL,
    MODIFY `residence_year` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Image`;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
