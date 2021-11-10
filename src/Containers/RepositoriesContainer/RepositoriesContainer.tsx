import React, { useEffect, useState } from "react";
import MyInput from "Components/MyInput";
import { GET_REPOSITORIES_BY_NAME } from "api/queries/repository";
import { useLazyQuery } from "@apollo/client";
import ListWrapper, { ListWrapperProps } from "Components/ListWrapper";
import { List } from "antd";

const renderList = (loading: Boolean, data: Array<ListWrapperProps>) => {
  if (loading) {
    return <List loading />;
  }
  if (data.length === 0) {
    return null;
  }
  return <ListWrapper data={data} />;
};

// разделить
const RepositoriesContainer = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [getRepositories, { loading, data }] = useLazyQuery(
    GET_REPOSITORIES_BY_NAME
  );
  const [repositories, setRepositories] = useState([]);

  // подумать о первой загрузке
  useEffect(() => {
    if (!isTyping && !loading) {
      getRepositories({
        variables: {
          query: inputValue,
        },
      });
    }
  }, [isTyping, inputValue, loading, getRepositories]);

  useEffect(() => setRepositories(data?.search.nodes || []), [data]);

  return (
    <>
      <MyInput
        setIsTyping={setIsTyping}
        value={inputValue}
        setValue={setInputValue}
        placeholder="Введите название репозитория"
      />
      {/* {renderList(loading || isTyping, data?.search.nodes)} */}
      {renderList(loading || isTyping, repositories)}
    </>
  );
};

export default RepositoriesContainer;
