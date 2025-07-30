
import { ApolloClient, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // ใช้ env
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET || "",
  },
  cache: new InMemoryCache(),
})
