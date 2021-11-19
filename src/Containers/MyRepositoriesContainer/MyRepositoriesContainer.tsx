import React from "react";
import { Space } from "antd";
import styled from "styled-components";
import SimplePagination from "components/SimplePagination";
import ListWrapper from "components/ListWrapper";
import { useQuery } from "@apollo/client";
import { GET_MY_REPOSITORIES } from "api/queries/repository";
import { PageInfo, Repository } from "types/repository";
import useRepositoriesHandlers from "hooks/useRepositoriesHandlers";
import useAuth from "hooks/useAuth";

const StyledSpace = styled(Space)`
  width: 100%;
`;

const ToRightDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const PAGE_SIZE = 10;

type MyRepositoriesVariables = {
  first?: number;
  last?: number;
  before?: string | null;
  after?: string | null;
};

type MyRepositoriesData = {
  viewer: {
    repositories: {
      pageInfo: PageInfo;
      nodes: Repository[];
    };
  };
};

const MyRepositoriesContainer = () => {
  const { user } = useAuth();
  const { login = "" } = user || {};
  const { handleStarClick } = useRepositoriesHandlers();

  const { loading, data, refetch } = useQuery<
    MyRepositoriesData,
    MyRepositoriesVariables
  >(GET_MY_REPOSITORIES, {
    variables: {
      first: PAGE_SIZE,
    },
  });

  const previousPage = () => {
    refetch({
      before: data?.viewer.repositories.pageInfo.startCursor,
      last: PAGE_SIZE,
    });
  };

  const nextPage = () => {
    refetch({
      after: data?.viewer.repositories.pageInfo.endCursor,
      first: PAGE_SIZE,
    });
  };

  return (
    <StyledSpace direction="vertical">
      <ToRightDiv>
        <SimplePagination
          nextPage={nextPage}
          disableNext={!data?.viewer.repositories.pageInfo.hasNextPage}
          disablePrevious={!data?.viewer.repositories.pageInfo.hasPreviousPage}
          previousPage={previousPage}
        />
      </ToRightDiv>
      <ListWrapper
        handleStarClick={handleStarClick}
        isLoading={loading}
        data={data?.viewer.repositories.nodes || []}
      />
      <ToRightDiv>
        <a
          href={`https://github.com/${login}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          Посмотреть на GitHub
        </a>
      </ToRightDiv>
    </StyledSpace>
  );
};

export default MyRepositoriesContainer;
