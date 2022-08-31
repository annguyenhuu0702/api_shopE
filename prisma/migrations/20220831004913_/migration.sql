/*
  Warnings:

  - You are about to drop the column `mediaId` on the `Banner` table. All the data in the column will be lost.
  - The primary key for the `ProductCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductCategory` table. All the data in the column will be lost.
  - The primary key for the `ProductOptionValue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ProductOptionValue` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ProductOptionValue` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductOptionValue` table. All the data in the column will be lost.
  - The primary key for the `ProductUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `ProductUser` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ProductUser` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductUser` table. All the data in the column will be lost.
  - The primary key for the `UserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `metaId` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `ProductOption` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Banner" DROP CONSTRAINT "Banner_mediaId_fkey";

-- DropIndex
DROP INDEX "Banner_slug_key";

-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "mediaId",
ADD COLUMN     "metaId" INTEGER NOT NULL,
ALTER COLUMN "slug" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "isDeleted",
DROP COLUMN "updatedAt",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productId", "categoryId");

-- AlterTable
ALTER TABLE "ProductOption" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductOptionValue" DROP CONSTRAINT "ProductOptionValue_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "ProductOptionValue_pkey" PRIMARY KEY ("productOptionId", "variantValueId");

-- AlterTable
ALTER TABLE "ProductUser" DROP CONSTRAINT "ProductUser_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "ProductUser_pkey" PRIMARY KEY ("userId", "productId");

-- AlterTable
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "isDeleted",
DROP COLUMN "updatedAt",
ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId", "roleId");

-- DropTable
DROP TABLE "Media";

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "cartId" INTEGER NOT NULL,
    "productOptionId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("cartId","productOptionId")
);

-- CreateTable
CREATE TABLE "OrderStatus" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OrderStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "percent" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "paymentMethodId" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "shippingPrice" INTEGER NOT NULL DEFAULT 0,
    "orderStatusId" INTEGER NOT NULL,
    "couponId" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "productOptionId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("productOptionId","orderId")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meta" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "ProductOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderStatusId_fkey" FOREIGN KEY ("orderStatusId") REFERENCES "OrderStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "ProductOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banner" ADD CONSTRAINT "Banner_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "Meta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
