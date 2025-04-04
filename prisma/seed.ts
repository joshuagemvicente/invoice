import { prisma } from "~/lib/prisma";
import { Prisma, type User } from "@prisma/client";
import bcrypt from "bcryptjs";

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "joshuagemvicente",
      email: "joshuagemvicente@example.com",
      password: await bcrypt.hash("joshua123", 10), // Hashing password with salt
      createdAt: new Date(),
    },
  });

  console.log("User created:", user);

  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Electronics",
        description:
          "Devices and gadgets including mobile phones, laptops, and accessories.",
        isActive: true,
        userId: user.id,
      },
      {
        name: "Clothing",
        description:
          "Men's and women's fashion, including shirts, pants, and accessories.",
        isActive: true,
        userId: user.id,
      },
      {
        name: "Home & Kitchen",
        description: "Appliances, furniture, and home essentials.",
        isActive: true,
        userId: user.id,
      },
      {
        name: "Books",
        description:
          "A wide range of books including fiction, non-fiction, and educational materials.",
        isActive: true,
        userId: user.id,
      },
    ],
  });

  console.log("Categories created successfully.");

  // Fetch categories to get their IDs
  const categoryList = await prisma.category.findMany();

  // Create products linked to categories and the user
  await prisma.product.createMany({
    data: [
      {
        name: "Smartphone",
        description: "Latest 5G smartphone with AI-powered camera.",
        stock: 50,
        price: 799.99,
        status: "inStock",
        barcode: "123456789",
        userId: user.id,
        categoryId: categoryList.find((cat) => cat.name === "Electronics")?.id,
      },
      {
        name: "Laptop",
        description: "Powerful laptop with high-performance specs.",
        stock: 30,
        price: 1299.99,
        status: "inStock",
        barcode: "987654321",
        userId: user.id,
        categoryId: categoryList.find((cat) => cat.name === "Electronics")?.id,
      },
      {
        name: "T-Shirt",
        description: "Comfortable cotton T-shirt in various sizes.",
        stock: 100,
        price: 19.99,
        status: "inStock",
        barcode: "543216789",
        userId: user.id,
        categoryId: categoryList.find((cat) => cat.name === "Clothing")?.id,
      },
      {
        name: "Fiction Novel",
        description: "A best-selling fiction novel.",
        stock: 20,
        price: 9.99,
        status: "lowStock",
        barcode: "112233445",
        userId: user.id,
        categoryId: categoryList.find((cat) => cat.name === "Books")?.id,
      },
    ],
  });

  console.log("Products created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
