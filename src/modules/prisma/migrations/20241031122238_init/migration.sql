-- CreateTable
CREATE TABLE "Speakers" (
    "id" STRING NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Speakers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talks" (
    "id" STRING NOT NULL,
    "topicTitle" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" STRING NOT NULL,
    "location" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Talks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendees" (
    "id" STRING NOT NULL,
    "firstname" STRING NOT NULL,
    "lastname" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "phone" STRING,
    "profession" STRING NOT NULL,
    "registrationId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AttendeesToTalks" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE INDEX "Speakers_id_idx" ON "Speakers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Talks_topicTitle_key" ON "Talks"("topicTitle");

-- CreateIndex
CREATE INDEX "Talks_id_idx" ON "Talks"("id");

-- CreateIndex
CREATE INDEX "Attendees_id_idx" ON "Attendees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AttendeesToTalks_AB_unique" ON "_AttendeesToTalks"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendeesToTalks_B_index" ON "_AttendeesToTalks"("B");

-- AddForeignKey
ALTER TABLE "Talks" ADD CONSTRAINT "Talks_id_fkey" FOREIGN KEY ("id") REFERENCES "Speakers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendeesToTalks" ADD CONSTRAINT "_AttendeesToTalks_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendeesToTalks" ADD CONSTRAINT "_AttendeesToTalks_B_fkey" FOREIGN KEY ("B") REFERENCES "Talks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
