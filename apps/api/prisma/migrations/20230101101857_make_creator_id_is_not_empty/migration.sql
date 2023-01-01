/*
  Warnings:

  - Made the column `creator_id` on table `Incident` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_creator_id_fkey";

-- AlterTable
ALTER TABLE "Incident" ALTER COLUMN "creator_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
