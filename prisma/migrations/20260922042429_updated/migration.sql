/*
  Warnings:

  - Added the required column `updated_at` to the `aliases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `domains` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aliases" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "domains" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "telephones" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "telephones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "telephones_number_key" ON "telephones"("number");

-- AddForeignKey
ALTER TABLE "telephones" ADD CONSTRAINT "telephones_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "financial_institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
