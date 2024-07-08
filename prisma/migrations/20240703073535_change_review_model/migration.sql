/*
  Warnings:

  - You are about to drop the column `comprehensive_opinion` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `detailed_address` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `evaluation_items` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `is_exposed` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `registration_date` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `residence_proof_document` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `residence_year` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `sigungu` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `usage_fee` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `view_count` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_userId_fkey`;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `comprehensive_opinion`,
    DROP COLUMN `detailed_address`,
    DROP COLUMN `evaluation_items`,
    DROP COLUMN `is_exposed`,
    DROP COLUMN `rating`,
    DROP COLUMN `registration_date`,
    DROP COLUMN `residence_proof_document`,
    DROP COLUMN `residence_year`,
    DROP COLUMN `sigungu`,
    DROP COLUMN `status`,
    DROP COLUMN `usage_fee`,
    DROP COLUMN `userId`,
    DROP COLUMN `view_count`,
    ADD COLUMN `useruserId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_useruserId_fkey` FOREIGN KEY (`useruserId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
