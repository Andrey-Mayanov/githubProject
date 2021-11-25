import React from "react";
import styled from "styled-components";
import { List, Spin } from "antd";

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

type ListWrapperDataType = {
  title: string | JSX.Element;
  description?: string | JSX.Element;
  actions?: Array<JSX.Element>;
};

const ListWrapper = ({
  data,
  emptyMessage = null,
  isLoading = false,
}: {
  data: Array<ListWrapperDataType>;
  emptyMessage?: string | null;
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return (
      <SpinWrapper>
        <Spin />
      </SpinWrapper>
    );
  }

  if (data.length === 0) {
    return <>{emptyMessage}</>;
  }

  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListWrapper;
