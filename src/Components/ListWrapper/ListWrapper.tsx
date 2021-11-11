import React from "react";
import styled from "styled-components";
import { List, Spin } from "antd";
import { Repository } from "types/repository";

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ListWrapper = ({
  data,
  isLoading,
}: {
  data: Array<Repository>;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <SpinWrapper>
        <Spin />
      </SpinWrapper>
    );
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.name} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default ListWrapper;
