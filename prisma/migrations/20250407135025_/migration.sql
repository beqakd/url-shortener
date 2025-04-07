/*
  Warnings:

  - You are about to drop the column `title` on the `urls` table. All the data in the column will be lost.
  - You are about to drop the column `ttl` on the `urls` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `urls` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires_at` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "urls" DROP COLUMN "title",
DROP COLUMN "ttl",
ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "urls_url_key" ON "urls"("url");
