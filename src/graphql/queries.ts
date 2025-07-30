import { gql } from "@apollo/client"

export const GET_TODOS = gql`
  query GetTodos {
    todos(order_by: { created_at: desc }) {
      id
      title
      description
      priority
      is_done
    }
  }
`
