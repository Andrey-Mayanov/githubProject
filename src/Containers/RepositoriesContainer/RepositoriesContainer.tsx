import React, { useCallback, useEffect, useState } from "react";
import {
  GET_REPOSITORIES_BY_NAME,
  ADD_STAR,
  REMOVE_STAR,
} from "api/queries/repository";
import { useLazyQuery, useMutation } from "@apollo/client";
import ListWrapper from "components/ListWrapper";
import { Input, Space } from "antd";
import styled from "styled-components";
import useDebounce from "hooks/useDebounce";
import { Scalars } from "types/repository";
import SimplePagination from "components/SimplePagination";

const StyledSpace = styled(Space)`
  width: 100%;
`;

const ToRightDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const PAGE_SIZE = 10;

const RepositoriesContainer = () => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const [getRepositories, { loading, data }] = useLazyQuery(
    GET_REPOSITORIES_BY_NAME
  );

  const getRepositoriesByOptions = useCallback(
    ({
      query,
      first,
      last,
      before,
      after,
    }: {
      query: string;
      first?: number;
      last?: number;
      before?: string;
      after?: string;
    }) => {
      getRepositories({
        variables: {
          query,
          first,
          last,
          before,
          after,
        },
      });
    },
    [getRepositories]
  );

  const [addStarMutation] = useMutation(ADD_STAR);
  const [removeStarMutation] = useMutation(REMOVE_STAR);

  const handleStarClick = (id: Scalars["ID"], isStarred: boolean) => {
    if (isStarred) {
      removeStarMutation({ variables: { starrableId: id } });
    } else {
      addStarMutation({ variables: { starrableId: id } });
    }
  };

  const debouncedInputValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debouncedInputValue) {
      getRepositoriesByOptions({
        query: debouncedInputValue,
        first: PAGE_SIZE,
      });
    }
    setIsTyping(false);
  }, [debouncedInputValue, getRepositoriesByOptions]);

  const previousPage = () => {
    getRepositoriesByOptions({
      query: debouncedInputValue,
      before: data?.search.pageInfo.startCursor,
      last: PAGE_SIZE,
    });
  };

  const nextPage = () => {
    getRepositoriesByOptions({
      query: debouncedInputValue,
      after: data?.search.pageInfo.endCursor,
      first: PAGE_SIZE,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setInputValue(event.target.value);
  };

  const isListLoading = loading || isTyping;
  const listEmptyValue = inputValue.length > 0 ? "Ничего не найдено" : null;

  return (
    <StyledSpace direction="vertical">
      <Input
        onChange={handleInputChange}
        placeholder="Введите название репозитория"
      />
      <ToRightDiv>
        <SimplePagination
          nextPage={nextPage}
          disableNext={!data?.search.pageInfo.hasNextPage}
          disablePrevious={!data?.search.pageInfo.hasPreviousPage}
          previousPage={previousPage}
        />
      </ToRightDiv>
      <ListWrapper
        handleStarClick={handleStarClick}
        emptyMessage={listEmptyValue}
        isLoading={isListLoading}
        data={data?.search.nodes || []}
      />
    </StyledSpace>
  );
};

export default RepositoriesContainer;
