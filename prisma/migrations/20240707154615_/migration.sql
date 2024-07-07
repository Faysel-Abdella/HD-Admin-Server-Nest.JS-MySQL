/*
  Warnings:

  - You are about to alter the column `admin_processed_at` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Comment` MODIFY `admin_processed_at` DATETIME(3) NULL;
