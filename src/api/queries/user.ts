import { gql } from "@apollo/client";

export const GET_MYSELF = gql`
  query getMyself($login: String!) {
    user(login: $login) {
      bio
      bioHTML
      followers {
        totalCount
      }
      name
      avatarUrl
      email
      url
      repositories {
        totalCount
      }
    }
  }
`;
