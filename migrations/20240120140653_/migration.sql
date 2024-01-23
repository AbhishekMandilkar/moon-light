/*
  Warnings:

  - You are about to drop the column `externalId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[external_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `external_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_externalId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "externalId",
ADD COLUMN     "external_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_external_id_key" ON "users"("external_id");
