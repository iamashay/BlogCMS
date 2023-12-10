/*
  Warnings:

  - Added the required column `forgotPassExpiry` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forgotPassToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifyExpiry` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "forgotPassExpiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "forgotPassToken" TEXT NOT NULL,
ADD COLUMN     "verifyExpiry" TIMESTAMP(3) NOT NULL;
