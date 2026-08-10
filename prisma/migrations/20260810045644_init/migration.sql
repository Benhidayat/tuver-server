-- CreateEnum
CREATE TYPE "bank_status" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "financial_institutions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" "bank_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financial_institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domains" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aliases" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,
    "institutionId" INTEGER NOT NULL,

    CONSTRAINT "aliases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "financial_institutions_name_country_key" ON "financial_institutions"("name", "country");

-- CreateIndex
CREATE UNIQUE INDEX "domains_domain_key" ON "domains"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "aliases_alias_institutionId_key" ON "aliases"("alias", "institutionId");

-- AddForeignKey
ALTER TABLE "domains" ADD CONSTRAINT "domains_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "financial_institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aliases" ADD CONSTRAINT "aliases_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "financial_institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
