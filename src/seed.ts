import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const userData = [
    {
      email: "alice@example.com",
      name: "Alice",
    },
    {
      email: "bob@example.com",
      name: "Bob",
    },
  ];

  for (const user of userData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
}

seed()
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
