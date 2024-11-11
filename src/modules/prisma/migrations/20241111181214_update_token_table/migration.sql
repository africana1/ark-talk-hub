/*
  Warnings:

  - You are about to drop the column `user` on the `Token` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "user";
ALTER TABLE "Token" ADD COLUMN     "userId" STRING NOT NULL;
