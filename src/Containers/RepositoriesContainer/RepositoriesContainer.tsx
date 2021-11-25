import React, { useCallback, useEffect, useState, useMemo } from "react";
import { GET_REPOSITORIES_BY_NAME } from "api/queries/repository";
import { useLazyQuery } from "@apollo/client";
import ListWrapper from "components/ListWrapper";
import { Input, Space } from "antd";
import styled from "styled-components";
import useDebounce from "hooks/useDebounce";
import SimplePagination from "components/SimplePagination";
import useRepositoriesHandlers from "hooks/useRepositoriesHandlers";
import { Repository, RepositoryOwner } from "types/repository";
import IconText from "components/IconText";
import { StarOutlined } from "@ant-design/icons";

const StyledSpace = styled(Space)`
  width: 100%;
`;

const ToRightDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const PAGE_SIZE = 10;

type RepositoryPart = Pick<
  Repository,
  "id" | "name" | "description" | "stargazerCount"
> & {
  owner: Pick<RepositoryOwner, "login">;
  viewerHasStarred: boolean;
};

const RepositoriesContainer = ({
  additionalToRequest = "",
  allowEmptyInput = false,
}: {
  additionalToRequest?: string;
  allowEmptyInput?: boolean;
}) => {
  const { handleStarClick } = useRepositoriesHandlers();
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
          query: `${query} ${additionalToRequest}`,
          first,
          last,
          before,
          after,
        },
      });
    },
    [getRepositories, additionalToRequest]
  );

  const debouncedInputValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (allowEmptyInput || debouncedInputValue) {
      getRepositoriesByOptions({
        query: debouncedInputValue,
        first: PAGE_SIZE,
      });
    }
    setIsTyping(false);
  }, [debouncedInputValue, allowEmptyInput, getRepositoriesByOptions]);

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

  const listData = useMemo(() => {
    return (data?.search.nodes || []).map((item: RepositoryPart) => {
      return {
        description: item.description,
        title: item.owner?.login
          ? `${item.owner.login}/${item.name}`
          : item.name,
        actions: [
          <IconText
            icon={<StarOutlined />}
            text={item.stargazerCount}
            onClick={() => {
              return handleStarClick(item.id, item.viewerHasStarred);
            }}
            color={item.viewerHasStarred ? "#1890ff" : ""}
          />,
        ],
      };
    });
  }, [data, handleStarClick]);

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
        emptyMessage={listEmptyValue}
        isLoading={isListLoading}
        data={listData}
      />
    </StyledSpace>
  );
};

export default RepositoriesContainer;
