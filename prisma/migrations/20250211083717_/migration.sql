-- CreateTable
CREATE TABLE `core.User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NULL,
    `whatsapp` VARCHAR(191) NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `id_npwp` VARCHAR(191) NULL,
    `id_card` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `core.User_email_key`(`email`),
    UNIQUE INDEX `core.User_username_key`(`username`),
    UNIQUE INDEX `core.User_id_npwp_key`(`id_npwp`),
    UNIQUE INDEX `core.User_id_card_key`(`id_card`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `core.Store` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `village` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `type` ENUM('food', 'electronic') NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL,
    `description` TEXT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `core.StoreUser` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `storeId` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `roleId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `core.Role` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `core.Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business.Product` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `basePrice` BIGINT NOT NULL,
    `categoryId` BIGINT NOT NULL,
    `storeId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business.Category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business.ProductVariant` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `productId` BIGINT NOT NULL,
    `image` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `extraPrice` BIGINT NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business.ProductPrice` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `productId` BIGINT NOT NULL,
    `finalPrice` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business.ProductPriceVariant` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `productPriceId` BIGINT NOT NULL,
    `productVariantId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales.Order` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `storeId` BIGINT NOT NULL,
    `memberId` BIGINT NULL,
    `cashierId` BIGINT NULL,
    `adminId` BIGINT NULL,
    `shiftId` BIGINT NOT NULL,
    `totalAmount` BIGINT NOT NULL,
    `discount` BIGINT NOT NULL DEFAULT 0,
    `paid` BIGINT NOT NULL DEFAULT 0,
    `change` BIGINT NOT NULL DEFAULT 0,
    `isPaid` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales.OrderDetail` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `orderId` BIGINT NOT NULL,
    `productId` BIGINT NOT NULL,
    `quantity` BIGINT NOT NULL,
    `unitPrice` BIGINT NOT NULL,
    `totalPrice` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales.OrderDetailVariant` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `orderDetailId` BIGINT NOT NULL,
    `productVariantId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales.PaymentMethod` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `feePercent` DOUBLE NULL,
    `taxfee` DOUBLE NULL,

    UNIQUE INDEX `sales.PaymentMethod_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales.Payment` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `orderId` BIGINT NOT NULL,
    `cashierId` BIGINT NULL,
    `methodId` BIGINT NOT NULL,
    `amount` BIGINT NOT NULL,
    `status` ENUM('paid', 'unpaid', 'cancelled') NOT NULL DEFAULT 'unpaid',
    `paymentUrl` VARCHAR(191) NULL,
    `referenceId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business.Shift` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `storeId` BIGINT NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business.ShiftUser` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `storeId` BIGINT NOT NULL,
    `shiftId` BIGINT NOT NULL,
    `userId` BIGINT NOT NULL,
    `roleId` BIGINT NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business.StoreBill` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `storeId` BIGINT NOT NULL,
    `ownerId` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('paid', 'unpaid') NOT NULL,
    `onDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `core.StoreUser` ADD CONSTRAINT `core.StoreUser_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `core.Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core.StoreUser` ADD CONSTRAINT `core.StoreUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `core.User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `core.StoreUser` ADD CONSTRAINT `core.StoreUser_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `core.Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.Product` ADD CONSTRAINT `business.Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `business.Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.Product` ADD CONSTRAINT `business.Product_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `core.Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.ProductVariant` ADD CONSTRAINT `business.ProductVariant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `business.Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.ProductPrice` ADD CONSTRAINT `business.ProductPrice_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `business.Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.ProductPriceVariant` ADD CONSTRAINT `business.ProductPriceVariant_productPriceId_fkey` FOREIGN KEY (`productPriceId`) REFERENCES `business.ProductPrice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.ProductPriceVariant` ADD CONSTRAINT `business.ProductPriceVariant_productVariantId_fkey` FOREIGN KEY (`productVariantId`) REFERENCES `business.ProductVariant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.Order` ADD CONSTRAINT `sales.Order_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `core.Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.Order` ADD CONSTRAINT `sales.Order_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `core.User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.Order` ADD CONSTRAINT `sales.Order_cashierId_fkey` FOREIGN KEY (`cashierId`) REFERENCES `core.User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.Order` ADD CONSTRAINT `sales.Order_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `core.User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.Order` ADD CONSTRAINT `sales.Order_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `business.Shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.OrderDetail` ADD CONSTRAINT `sales.OrderDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `sales.Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.OrderDetail` ADD CONSTRAINT `sales.OrderDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `business.Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.OrderDetailVariant` ADD CONSTRAINT `sales.OrderDetailVariant_orderDetailId_fkey` FOREIGN KEY (`orderDetailId`) REFERENCES `sales.OrderDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.OrderDetailVariant` ADD CONSTRAINT `sales.OrderDetailVariant_productVariantId_fkey` FOREIGN KEY (`productVariantId`) REFERENCES `business.ProductVariant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.Payment` ADD CONSTRAINT `sales.Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `sales.Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.Payment` ADD CONSTRAINT `sales.Payment_cashierId_fkey` FOREIGN KEY (`cashierId`) REFERENCES `core.User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales.Payment` ADD CONSTRAINT `sales.Payment_methodId_fkey` FOREIGN KEY (`methodId`) REFERENCES `sales.PaymentMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.Shift` ADD CONSTRAINT `business.Shift_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `core.Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.ShiftUser` ADD CONSTRAINT `business.ShiftUser_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `core.Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.ShiftUser` ADD CONSTRAINT `business.ShiftUser_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `business.Shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.ShiftUser` ADD CONSTRAINT `business.ShiftUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `core.User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.ShiftUser` ADD CONSTRAINT `business.ShiftUser_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `core.Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.StoreBill` ADD CONSTRAINT `business.StoreBill_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `core.Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business.StoreBill` ADD CONSTRAINT `business.StoreBill_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `core.User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
