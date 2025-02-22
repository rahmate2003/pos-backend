/*
  Warnings:

  - Made the column `imageUrl` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `imageUrl` VARCHAR(255) NOT NULL DEFAULT '/image.jpg';
