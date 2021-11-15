import React, { useEffect, useState } from "react";
import { GET_REPOSITORIES_BY_NAME, ADD_STAR } from "api/queries/repository";
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

const RepositoriesContainer = () => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const [getRepositories, { loading, data }] = useLazyQuery(
    GET_REPOSITORIES_BY_NAME,
    {
      fetchPolicy: "no-cache",
    }
  );
  const getRepositoriesByOptions = ({
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
  };

  const [addStarMutation, { loading: isMutationLoading }] =
    useMutation(ADD_STAR);

  const addStar = (id: Scalars["ID"]) => {
    addStarMutation({ variables: { starrableId: id } })
      .then(() => {
        getRepositoriesByOptions({
          query: inputValue,
          first: 10,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const debouncedInputValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debouncedInputValue) {
      getRepositoriesByOptions({
        query: debouncedInputValue,
        first: 10,
      });
    }
    setIsTyping(false);
  }, [debouncedInputValue, getRepositories]);

  const previousPage = () => {
    getRepositoriesByOptions({
      query: debouncedInputValue,
      before: data?.search.pageInfo.startCursor,
      last: 10,
    });
  };

  const nextPage = () => {
    getRepositoriesByOptions({
      query: debouncedInputValue,
      after: data?.search.pageInfo.endCursor,
      first: 10,
    });
  };

  return (
    <StyledSpace direction="vertical">
      <Input
        onChange={(event) => {
          setIsTyping(true);
          setInputValue(event.target.value);
        }}
        placeholder="Введите название репозитория"
      />
      <ToRightDiv>
        <SimplePagination
          nextPage={() => nextPage()}
          disableNext={!data?.search.pageInfo.hasNextPage}
          disablePrevious={!data?.search.pageInfo.hasPreviousPage}
          previousPage={() => previousPage()}
        />
      </ToRightDiv>
      <ListWrapper
        addStar={(id: Scalars["ID"]) => addStar(id)}
        emptyMessage={inputValue.length > 0 ? "Ничего не найдено" : null}
        isLoading={loading || isTyping || isMutationLoading}
        data={data?.search.nodes || []}
      />
    </StyledSpace>
  );
};

export default RepositoriesContainer;
