import { PrismaClient } from "@prisma/client";
import products from "./data.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();

  await prisma.$queryRaw`delete from sqlite_sequence where name='Cart'`;
  await prisma.$queryRaw`delete from sqlite_sequence where name='Product'`;

  // Create Cart
  const cart = await prisma.cart.create({});

  console.log("Cart is created!");

  // Create Products
  products.forEach(
    async (product) => await prisma.product.create({ data: product })
  );

  console.log("Products are created!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
