-- CreateTable
CREATE TABLE `EvaluationItem` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `display_order` INTEGER NOT NULL,
    `question_text` VARCHAR(191) NOT NULL,
    `score_0_text` VARCHAR(191) NOT NULL,
    `score_1_text` VARCHAR(191) NOT NULL,
    `score_3_text` VARCHAR(191) NOT NULL,
    `score_5_text` VARCHAR(191) NOT NULL,
    `price` DOUBLE NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
