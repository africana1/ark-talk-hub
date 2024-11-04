-- CreateTable
CREATE TABLE "Admin" (
    "id" STRING NOT NULL,
    "username" STRING NOT NULL,
    "password" STRING NOT NULL,
    "email" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "id" STRING NOT NULL,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talk" (
    "id" STRING NOT NULL,
    "topicTitle" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" STRING NOT NULL,
    "location" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Talk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendee" (
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

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AttendeeToTalk" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_id_idx" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Speaker_email_key" ON "Speaker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Speaker_phone_key" ON "Speaker"("phone");

-- CreateIndex
CREATE INDEX "Speaker_id_idx" ON "Speaker"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Talk_topicTitle_key" ON "Talk"("topicTitle");

-- CreateIndex
CREATE INDEX "Talk_id_idx" ON "Talk"("id");

-- CreateIndex
CREATE INDEX "Attendee_id_idx" ON "Attendee"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AttendeeToTalk_AB_unique" ON "_AttendeeToTalk"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendeeToTalk_B_index" ON "_AttendeeToTalk"("B");

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_id_fkey" FOREIGN KEY ("id") REFERENCES "Speaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendeeToTalk" ADD CONSTRAINT "_AttendeeToTalk_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendeeToTalk" ADD CONSTRAINT "_AttendeeToTalk_B_fkey" FOREIGN KEY ("B") REFERENCES "Talk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
