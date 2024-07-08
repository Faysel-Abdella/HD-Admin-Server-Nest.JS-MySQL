/*
  Warnings:

  - You are about to drop the column `imagesUrl` on the `Image` table. All the data in the column will be lost.
  - Added the required column `images` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Image` DROP COLUMN `imagesUrl`,
    ADD COLUMN `images` JSON NOT NULL;
