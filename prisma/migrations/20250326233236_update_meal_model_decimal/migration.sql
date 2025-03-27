/*
  Warnings:

  - You are about to alter the column `protein` on the `Meal` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,1)`.
  - You are about to alter the column `carbs` on the `Meal` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,1)`.
  - You are about to alter the column `fat` on the `Meal` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(5,1)`.

*/
-- AlterTable
ALTER TABLE "Meal" ALTER COLUMN "protein" SET DATA TYPE DECIMAL(5,1),
ALTER COLUMN "carbs" SET DATA TYPE DECIMAL(5,1),
ALTER COLUMN "fat" SET DATA TYPE DECIMAL(5,1);
