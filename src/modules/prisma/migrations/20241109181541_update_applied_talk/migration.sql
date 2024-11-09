/*
  Warnings:

  - You are about to drop the `_AppliedTalkToAttendee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attendeeId` to the `AppliedTalk` table without a default value. This is not possible if the table is not empty.
  - Made the column `talkId` on table `AppliedTalk` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AppliedTalk" DROP CONSTRAINT "AppliedTalk_talkId_fkey";

-- DropForeignKey
ALTER TABLE "_AppliedTalkToAttendee" DROP CONSTRAINT "_AppliedTalkToAttendee_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppliedTalkToAttendee" DROP CONSTRAINT "_AppliedTalkToAttendee_B_fkey";

-- AlterTable
ALTER TABLE "AppliedTalk" ADD COLUMN     "attendeeId" STRING NOT NULL;
ALTER TABLE "AppliedTalk" ALTER COLUMN "talkId" SET NOT NULL;

-- DropTable
DROP TABLE "_AppliedTalkToAttendee";

-- AddForeignKey
ALTER TABLE "AppliedTalk" ADD CONSTRAINT "AppliedTalk_talkId_fkey" FOREIGN KEY ("talkId") REFERENCES "Talk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppliedTalk" ADD CONSTRAINT "AppliedTalk_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
