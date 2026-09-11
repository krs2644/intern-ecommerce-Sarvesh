/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dummyId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dummyId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE product_id_seq;
ALTER TABLE "Product" ADD COLUMN     "dummyId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('product_id_seq');
ALTER SEQUENCE product_id_seq OWNED BY "Product"."id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_key" ON "CartItem"("cartId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_dummyId_key" ON "Product"("dummyId");
