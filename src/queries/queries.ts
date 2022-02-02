import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    tasks(order_by: { created_at: desc }) {
      id
      title
      complete
      created_at
      updated_at
    }
  }
`;
export const CREATE_TASK = gql`
  mutation CreateTask($title: String!) {
    insert_tasks_one(object: { title: $title }) {
      id
      title
      created_at
    }
  }
`;
export const DELETE_TASK = gql`
  mutation DeleteTask($id: uuid!) {
    delete_tasks_by_pk(id: $id) {
      id
      title
    }
  }
`;
export const UPDATE_TASK = gql`
  mutation UpdateTask($id: uuid!, $title: String!) {
    update_tasks_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
      id
      title
    }
  }
`;
