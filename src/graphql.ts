import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    allUsers: [User!]!
  }

  type User {
    id: Int!
    name: String!
  }
`;

const resolvers = {
  Query: {
    allUsers: async () => {
      return await prisma.user.findMany();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
