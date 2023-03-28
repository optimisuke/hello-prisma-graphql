import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
    },
  });
  //   console.log(newUser);
  //   const user = await prisma.user.findUnique({
  //     where: { id: 1 },
  //   });
  //   console.log(user);
  console.log(newUser);
  const user = await prisma.user.findUnique({
    where: { email: "alice@example.com" },
  });
  console.log(user);

  const updatedUser = await prisma.user.update({
    where: { id: user?.id },
    data: { name: "Updated Alice" },
  });
  console.log(updatedUser);

  const deletedUser = await prisma.user.delete({
    where: { id: user?.id },
  });
  console.log(deletedUser);

  const newUserWithPost = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
      posts: {
        create: {
          title: "First post",
          content: "Hello, world!",
        },
      },
    },
  });
  console.log(newUserWithPost);

  const userWithPosts = await prisma.user.findUnique({
    where: { id: newUserWithPost.id },
    include: { posts: true },
  });
  console.log(userWithPosts);
  const deletedPost = await prisma.post.deleteMany({
    where: { authorId: newUserWithPost.id },
  });
  console.log(deletedPost);
  const deletedUser2 = await prisma.user.delete({
    where: { id: newUserWithPost.id },
  });
  console.log(deletedUser2);
}

main()
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
