/*
  Warnings:

  - You are about to drop the column `detailedDescription` on the `EvaluationItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `EvaluationItem` DROP FOREIGN KEY `EvaluationItem_reviewId_fkey`;

-- AlterTable
ALTER TABLE `EvaluationItem` DROP COLUMN `detailedDescription`;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `reviewEvaluationItems` JSON NULL;
