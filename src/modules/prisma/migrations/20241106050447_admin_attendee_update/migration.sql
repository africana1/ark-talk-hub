-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "role" STRING NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE "Attendee" ADD COLUMN     "role" STRING NOT NULL DEFAULT 'attendee';
