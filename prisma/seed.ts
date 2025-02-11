import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  
  // 1. Buat User
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.does@example.com',
      username: 'johndoe',
      telephone: '081234567890',
      whatsapp: '081234567890',
      gender: 'male',
      password: await bcrypt.hash('password', 10),
      id_npwp: '123456789012345',
      id_card: '1234567890123456',
    },
  });

  console.log('User created:', user);

  // 2. Buat Store
  const store = await prisma.store.create({
    data: {
      name: 'Toko ABC',
      image: 'logo.png',
      address: 'Jl. Contoh No. 123',
      province: 'Jawa Barat',
      city: 'Bandung',
      district: 'Coblong',
      village: 'Dago',
      postal_code: '40135',
      type: 'food',
      status: 'active',
      description: 'Toko makanan enak',
      telephone: '081234567890',
      logo: 'logo.png',
    },
  });

  console.log('Store created:', store);

  // 3. Buat Role
  const role = await prisma.role.create({
    data: {
      name: 'Owner',
    },
  });

  console.log('Role created:', role);

  // 4. Buat StoreUser (Hubungkan User, Store, dan Role)
  const storeUser = await prisma.storeUser.create({
    data: {
      storeId: store.id,
      userId: user.id,
      roleId: role.id,
    },
  });

  console.log('StoreUser created:', storeUser);

  // 5. Buat Category
  const category = await prisma.category.create({
    data: {
      name: 'Makanan',
    },
  });

  console.log('Category created:', category);

  // 6. Buat Product (Terkait dengan Store dan Category)
  const product = await prisma.product.create({
    data: {
      name: 'Nasi Goreng',
      image: 'nasi_goreng.jpg',
      description: 'Nasi goreng spesial',
      basePrice: 25000,
      categoryId: category.id,
      storeId: store.id,
    },
  });

  console.log('Product created:', product);

  // 7. Buat ProductVariant untuk Product
  const productVariant = await prisma.productVariant.create({
    data: {
      productId: product.id,
      image: 'nasi_goreng_pedas.jpg',
      description: 'Nasi goreng pedas',
      extraPrice: 5000,
      type: 'Rasa',
    },
  });

  console.log('ProductVariant created:', productVariant);

  // 8. Buat ProductPrice untuk Product
  const productPrice = await prisma.productPrice.create({
    data: {
      productId: product.id,
      finalPrice: 30000,
    },
  });

  console.log('ProductPrice created:', productPrice);

  // 9. Buat ProductPriceVariant (Hubungkan ProductPrice dan ProductVariant)
  const productPriceVariant = await prisma.productPriceVariant.create({
    data: {
      productPriceId: productPrice.id,
      productVariantId: productVariant.id,
    },
  });

  console.log('ProductPriceVariant created:', productPriceVariant);

  // 10. Buat Shift
  const shift = await prisma.shift.create({
    data: {
      storeId: store.id,
      date: new Date(),
      startTime: '08:00:00',
      endTime: '16:00:00',
    },
  });

  console.log('Shift created:', shift);

  // 11. Buat ShiftUser (Hubungkan Shift, Store, User, dan Role)
  const shiftUser = await prisma.shiftUser.create({
    data: {
      storeId: store.id,
      shiftId: shift.id,
      userId: user.id,
      roleId: role.id,
      status: 'active',
    },
  });

  console.log('ShiftUser created:', shiftUser);

  // 12. Buat Order
  const order = await prisma.order.create({
    data: {
      storeId: store.id,
      cashierId: user.id,
      adminId: user.id,
      shiftId: shift.id,
      totalAmount: 30000,
      discount: 0,
      paid: 30000,
      change: 0,
      isPaid: true,
    },
  });

  console.log('Order created:', order);

  // 13. Buat OrderDetail
  const orderDetail = await prisma.orderDetail.create({
    data: {
      orderId: order.id,
      productId: product.id,
      quantity: 1,
      unitPrice: 25000,
      totalPrice: 25000,
    },
  });

  console.log('OrderDetail created:', orderDetail);

  // 14. Buat OrderDetailVariant (Hubungkan OrderDetail dan ProductVariant)
  const orderDetailVariant = await prisma.orderDetailVariant.create({
    data: {
      orderDetailId: orderDetail.id,
      productVariantId: productVariant.id,
    },
  });

  console.log('OrderDetailVariant created:', orderDetailVariant);

  // 15. Buat PaymentMethod
  const paymentMethod = await prisma.paymentMethod.create({
    data: {
      name: 'Cash',
      description: 'Pembayaran tunai',
      isActive: true,
    },
  });

  console.log('PaymentMethod created:', paymentMethod);

  // 16. Buat Payment
  const payment = await prisma.payment.create({
    data: {
      orderId: order.id,
      cashierId: user.id,
      methodId: paymentMethod.id,
      amount: 30000,
      status: 'paid',
      paymentUrl: 'https://example.com/payment',
    },
  });

  console.log('Payment created:', payment);

  // 17. Buat StoreBill
  const storeBill = await prisma.storeBill.create({
    data: {
      storeId: store.id,
      ownerId: user.id,
      name: 'Tagihan Listrik',
      status: 'unpaid',
      onDate: new Date(),
    },
  });

  console.log('StoreBill created:', storeBill);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });