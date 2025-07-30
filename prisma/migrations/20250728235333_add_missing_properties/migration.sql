/*
  Warnings:

  - Added the required column `brand` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
