/*
  Warnings:

  - You are about to drop the column `profession` on the `Attendee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Attendee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Attendee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Token_id_idx";

-- AlterTable
ALTER TABLE "Attendee" DROP COLUMN "profession";

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_phone_key" ON "Attendee"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_email_key" ON "Attendee"("email");

-- CreateIndex
CREATE INDEX "Token_id_token_idx" ON "Token"("id", "token");
