import { gql } from "@apollo/client"

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $description: String, $priority: String!) {
    insert_todos_one(object: {
      title: $title,
      description: $description,
      priority: $priority
    }) {
      id
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: uuid!
    $title: String!
    $description: String
    $priority: String!
  ) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: {
        title: $title
        description: $description
        priority: $priority
      }
    ) {
      id
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: uuid!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`

export const TOGGLE_DONE = gql`
  mutation ToggleDone($id: uuid!, $is_done: Boolean!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { is_done: $is_done }) {
      id
    }
  }
`