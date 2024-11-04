/*
  Warnings:

  - You are about to drop the column `username` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Attendee` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Attendee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registrationId]` on the table `Attendee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `Attendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Attendee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Attendee" DROP COLUMN "firstname";
ALTER TABLE "Attendee" DROP COLUMN "lastname";
ALTER TABLE "Attendee" ADD COLUMN     "firstName" STRING NOT NULL;
ALTER TABLE "Attendee" ADD COLUMN     "lastName" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_registrationId_key" ON "Attendee"("registrationId");
