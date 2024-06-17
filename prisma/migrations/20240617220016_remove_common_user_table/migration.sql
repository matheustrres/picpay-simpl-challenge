/*
  Warnings:

  - You are about to drop the column `userId` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `shopkeepers` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CPF]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[walletId]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `shopkeepers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[CPF]` on the table `shopkeepers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[walletId]` on the table `shopkeepers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CPF` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletId` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CPF` to the `shopkeepers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `shopkeepers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `shopkeepers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `shopkeepers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `shopkeepers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `shopkeepers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletId` to the `shopkeepers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userId_fkey";

-- DropForeignKey
ALTER TABLE "shopkeepers" DROP CONSTRAINT "shopkeepers_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_walletId_fkey";

-- DropIndex
DROP INDEX "customers_userId_idx";

-- DropIndex
DROP INDEX "customers_userId_key";

-- DropIndex
DROP INDEX "shopkeepers_userId_CNPJ_idx";

-- DropIndex
DROP INDEX "shopkeepers_userId_key";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "userId",
ADD COLUMN     "CPF" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "walletId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "shopkeepers" DROP COLUMN "userId",
ADD COLUMN     "CPF" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "walletId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "users";

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_CPF_key" ON "customers"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "customers_walletId_key" ON "customers"("walletId");

-- CreateIndex
CREATE INDEX "customers_email_CPF_idx" ON "customers"("email", "CPF");

-- CreateIndex
CREATE UNIQUE INDEX "shopkeepers_email_key" ON "shopkeepers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shopkeepers_CPF_key" ON "shopkeepers"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "shopkeepers_walletId_key" ON "shopkeepers"("walletId");

-- CreateIndex
CREATE INDEX "shopkeepers_email_CPF_CNPJ_idx" ON "shopkeepers"("email", "CPF", "CNPJ");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopkeepers" ADD CONSTRAINT "shopkeepers_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
