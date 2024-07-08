/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Image` DROP COLUMN `imageUrl`,
    ADD COLUMN `imagesUrl` JSON NULL,
    MODIFY `processedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `photos`;
