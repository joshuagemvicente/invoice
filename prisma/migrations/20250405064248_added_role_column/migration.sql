-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'Cashier');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Roles" DEFAULT 'Admin';
