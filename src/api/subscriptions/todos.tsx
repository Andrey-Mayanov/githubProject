import { gql } from "@apollo/client";

export const NOTIFY_NEW_PUBLIC_TODOS = gql`
  subscription {
    online_users(limit: 10, order_by: { last_seen: asc }) {
      id
      last_seen
      user {
        name
      }
    }
  }
`;
