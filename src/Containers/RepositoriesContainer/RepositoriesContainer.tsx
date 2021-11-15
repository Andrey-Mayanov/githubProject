import React, { useEffect, useState } from "react";
import { GET_REPOSITORIES_BY_NAME } from "api/queries/repository";
import { useLazyQuery } from "@apollo/client";
import ListWrapper from "components/ListWrapper";
import { Input, Space } from "antd";
import styled from "styled-components";
import useDebounce from "hooks/useDebounce";

const StyledSpace = styled(Space)`
  width: 100%;
`;

const RepositoriesContainer = () => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [getRepositories, { loading, data }] = useLazyQuery(
    GET_REPOSITORIES_BY_NAME
  );

  const debouncedInputValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debouncedInputValue) {
      getRepositories({
        variables: {
          query: debouncedInputValue,
        },
      });
    }
    setIsTyping(false);
  }, [debouncedInputValue, getRepositories]);

  return (
    <StyledSpace direction="vertical">
      <Input
        onChange={(event) => {
          setIsTyping(true);
          setInputValue(event.target.value);
        }}
        placeholder="Введите название репозитория"
      />
      <ListWrapper
        emptyMessage={inputValue.length > 0 ? "Ничего не найдено" : null}
        isLoading={loading || isTyping}
        data={data?.search.nodes || []}
      />
    </StyledSpace>
  );
};

export default RepositoriesContainer;
