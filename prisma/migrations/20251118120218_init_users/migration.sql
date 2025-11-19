/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `age`,
    DROP COLUMN `createdAt`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NULL;
