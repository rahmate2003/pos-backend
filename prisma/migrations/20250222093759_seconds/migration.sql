/*
  Warnings:

  - You are about to drop the column `store_user_id` on the `customers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `customers_store_user_id_fkey`;

-- DropIndex
DROP INDEX `customers_store_user_id_fkey` ON `customers`;

-- AlterTable
ALTER TABLE `customers` DROP COLUMN `store_user_id`,
    ADD COLUMN `storeUserId` BIGINT NULL;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_storeUserId_fkey` FOREIGN KEY (`storeUserId`) REFERENCES `store_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
