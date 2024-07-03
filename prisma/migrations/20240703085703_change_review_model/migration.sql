/*
  Warnings:

  - Made the column `price` on table `EvaluationItem` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `address` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sigungu` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usage_fee` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EvaluationItem` MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `comprehensive_opinion` VARCHAR(191) NULL,
    ADD COLUMN `detailed_address` VARCHAR(191) NULL,
    ADD COLUMN `is_exposed` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `rating` DOUBLE NOT NULL,
    ADD COLUMN `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `residence_proof_document` VARCHAR(191) NULL,
    ADD COLUMN `residence_year` VARCHAR(191) NULL,
    ADD COLUMN `sigungu` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('DRAFT', 'WAITING', 'APPROVED', 'REJECTED', 'WAITING_FOR_UPDATE', 'WAITING_FOR_RESIDENCE_VERIFICATION', 'WAITING_AFTER_REJECTION') NOT NULL DEFAULT 'DRAFT',
    ADD COLUMN `usage_fee` DOUBLE NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    ADD COLUMN `view_count` INTEGER NOT NULL DEFAULT 0;
