import React from "react";
import styled from "styled-components";
import { List, Space, Spin } from "antd";
import { Repository, RepositoryOwner } from "types/repository";
import { Scalars } from "types/repository";
import { StarOutlined } from "@ant-design/icons";

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

type RepositoryPart = Pick<
  Repository,
  "id" | "name" | "description" | "stargazerCount"
> & { owner: Pick<RepositoryOwner, "login"> };

const ListWrapper = ({
  data,
  emptyMessage = null,
  isLoading = false,
  handleStarClick = () => {},
}: {
  data: Array<RepositoryPart>;
  emptyMessage?: string | null;
  isLoading?: boolean;
  handleStarClick?: (id: Scalars["ID"]) => void;
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
          <List.Item
            actions={[
              <IconText
                icon={<StarOutlined />}
                text={item.stargazerCount}
                onClick={() => handleStarClick(item.id)}
              />,
            ]}
          >
            <List.Item.Meta
              title={`${item.owner.login}/${item.name}`}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListWrapper;
