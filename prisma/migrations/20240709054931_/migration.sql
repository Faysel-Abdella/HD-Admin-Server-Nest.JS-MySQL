/*
  Warnings:

  - You are about to drop the column `images` on the `Image` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `EvaluationItem_reviewId_fkey` ON `EvaluationItem`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `images`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;
