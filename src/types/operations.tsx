import * as Types from "./schemas";

export type PageInfoFieldsFragment = {
  __typename?: "PageInfo";
  startCursor?: string | null | undefined;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor?: string | null | undefined;
};

export type RepositoryFieldsFragment = {
  __typename?: "Repository";
  id: string;
  name: string;
  description?: string | null | undefined;
  stargazerCount: number;
  viewerHasStarred: boolean;
};

export type SearchRepositoriesQueryVariables = Types.Exact<{
  query: Types.Scalars["String"];
  after?: Types.Maybe<Types.Scalars["String"]>;
  before?: Types.Maybe<Types.Scalars["String"]>;
  first?: Types.Maybe<Types.Scalars["Int"]>;
  last?: Types.Maybe<Types.Scalars["Int"]>;
}>;

export type SearchRepositoriesQuery = {
  __typename?: "Query";
  search: {
    __typename?: "SearchResultItemConnection";
    pageInfo: {
      __typename?: "PageInfo";
      startCursor?: string | null | undefined;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor?: string | null | undefined;
    };
    nodes?:
      | Array<
          | { __typename?: "App" }
          | { __typename?: "Discussion" }
          | { __typename?: "Issue" }
          | { __typename?: "MarketplaceListing" }
          | { __typename?: "Organization" }
          | { __typename?: "PullRequest" }
          | {
              __typename?: "Repository";
              id: string;
              name: string;
              description?: string | null | undefined;
              stargazerCount: number;
              viewerHasStarred: boolean;
              owner:
                | { __typename?: "Organization"; login: string }
                | { __typename?: "User"; login: string };
            }
          | { __typename?: "User" }
          | null
          | undefined
        >
      | null
      | undefined;
  };
};

export type AddStarMutationVariables = Types.Exact<{
  starrableId: Types.Scalars["ID"];
}>;

export type AddStarMutation = {
  __typename?: "Mutation";
  addStar?:
    | {
        __typename?: "AddStarPayload";
        starrable?:
          | {
              __typename?: "Gist";
              id: string;
              stargazerCount: number;
              viewerHasStarred: boolean;
            }
          | {
              __typename?: "Repository";
              id: string;
              stargazerCount: number;
              viewerHasStarred: boolean;
            }
          | {
              __typename?: "Topic";
              id: string;
              stargazerCount: number;
              viewerHasStarred: boolean;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type RemoveStarMutationVariables = Types.Exact<{
  starrableId: Types.Scalars["ID"];
}>;

export type RemoveStarMutation = {
  __typename?: "Mutation";
  removeStar?:
    | {
        __typename?: "RemoveStarPayload";
        starrable?:
          | {
              __typename?: "Gist";
              id: string;
              stargazerCount: number;
              viewerHasStarred: boolean;
            }
          | {
              __typename?: "Repository";
              id: string;
              stargazerCount: number;
              viewerHasStarred: boolean;
            }
          | {
              __typename?: "Topic";
              id: string;
              stargazerCount: number;
              viewerHasStarred: boolean;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};
