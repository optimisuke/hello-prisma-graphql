import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createPostWithTransaction() {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.post.create({
        data: {
          title: "title",
          content: "content",
          authorId: 1,
        },
      });

      await prisma.user.update({
        where: { id: 1 },
        data: {
          name: "Updated name",
        },
      });
    });
  } catch (e) {
    console.error(e);
  }
}

createPostWithTransaction()
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
