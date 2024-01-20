-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "commentEnabled" BOOLEAN NOT NULL DEFAULT true;
