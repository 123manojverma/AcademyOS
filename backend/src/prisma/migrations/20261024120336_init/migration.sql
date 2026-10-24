-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneno" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "rollno" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneno_key" ON "User"("phoneno");

-- CreateIndex
CREATE UNIQUE INDEX "User_rollno_key" ON "User"("rollno");
