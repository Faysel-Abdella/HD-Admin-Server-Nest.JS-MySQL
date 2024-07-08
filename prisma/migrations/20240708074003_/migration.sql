/*
  Warnings:

  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Image` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EvaluationItem` MODIFY `selectedScore` INTEGER NULL;

-- AlterTable
ALTER TABLE `Image` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `isExposed` BOOLEAN NOT NULL DEFAULT true,
    ADD PRIMARY KEY (`imageId`);
