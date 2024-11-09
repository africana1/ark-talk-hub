/*
  Warnings:

  - You are about to drop the `_AttendeeToTalk` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `speakerId` to the `Talk` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Talk" DROP CONSTRAINT "Talk_id_fkey";

-- DropForeignKey
ALTER TABLE "_AttendeeToTalk" DROP CONSTRAINT "_AttendeeToTalk_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttendeeToTalk" DROP CONSTRAINT "_AttendeeToTalk_B_fkey";

-- AlterTable
ALTER TABLE "Talk" ADD COLUMN     "speakerId" STRING NOT NULL;

-- DropTable
DROP TABLE "_AttendeeToTalk";

-- CreateTable
CREATE TABLE "AppliedTalk" (
    "id" STRING NOT NULL,
    "talkId" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppliedTalk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AppliedTalkToAttendee" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE INDEX "AppliedTalk_id_idx" ON "AppliedTalk"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AppliedTalkToAttendee_AB_unique" ON "_AppliedTalkToAttendee"("A", "B");

-- CreateIndex
CREATE INDEX "_AppliedTalkToAttendee_B_index" ON "_AppliedTalkToAttendee"("B");

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "Speaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppliedTalk" ADD CONSTRAINT "AppliedTalk_talkId_fkey" FOREIGN KEY ("talkId") REFERENCES "Talk"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppliedTalkToAttendee" ADD CONSTRAINT "_AppliedTalkToAttendee_A_fkey" FOREIGN KEY ("A") REFERENCES "AppliedTalk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppliedTalkToAttendee" ADD CONSTRAINT "_AppliedTalkToAttendee_B_fkey" FOREIGN KEY ("B") REFERENCES "Attendee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
