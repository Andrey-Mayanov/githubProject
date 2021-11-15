import React from "react";
import styled from "styled-components";
import { Button, List, Space, Spin } from "antd";
import { Repository } from "types/repository";
import { Scalars } from "types/repository";
import { LeftOutlined, RightOutlined, StarOutlined } from "@ant-design/icons";

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ClickbaleSpace = styled(Space)`
  cursor: pointer;
`;

const IconText = ({
  icon,
  text,
  onClick,
}: {
  icon: object;
  text: string | number;
  onClick: () => void;
}) => (
  <ClickbaleSpace onClick={onClick}>
    {icon}
    {text}
  </ClickbaleSpace>
);

const ListWrapper = ({
  data,
  emptyMessage = null,
  isLoading,
  addStar,
  nextPage,
  previousPage,
}: {
  data: Array<Repository>;
  emptyMessage?: string | null;
  isLoading: boolean;
  addStar: (id: Scalars["ID"]) => void;
  nextPage: () => void;
  previousPage: () => void;
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
      <Space>
        <Button onClick={() => previousPage()} type="primary">
          <LeftOutlined />
          Previous
        </Button>
        <Button onClick={() => nextPage()} type="primary">
          Next
          <RightOutlined />
        </Button>
      </Space>
      <List
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <IconText
                icon={<StarOutlined />}
                text={item.stargazerCount}
                onClick={() => addStar(item.id)}
              />,
            ]}
          >
            <List.Item.Meta title={item.name} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListWrapper;
