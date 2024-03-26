/*
  Warnings:

  - You are about to drop the column `replyId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_replyId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "replyId",
ADD COLUMN     "commentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
