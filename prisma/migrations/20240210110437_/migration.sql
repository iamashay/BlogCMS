-- DropForeignKey
ALTER TABLE "PostMeta" DROP CONSTRAINT "PostMeta_postId_fkey";

-- AddForeignKey
ALTER TABLE "PostMeta" ADD CONSTRAINT "PostMeta_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
