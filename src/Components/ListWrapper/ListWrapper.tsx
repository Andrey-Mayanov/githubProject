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

const IconTextSpace = styled(Space)`
  color: ${(props) => props.color};
  cursor: pointer;
`;

const IconText = ({
  icon,
  text,
  onClick,
  color,
}: {
  icon: object;
  text: string | number;
  onClick: () => void;
  color: string;
}) => (
  <IconTextSpace color={color} onClick={onClick}>
    {icon}
    {text}
  </IconTextSpace>
);

type RepositoryPart = Pick<
  Repository,
  "id" | "name" | "description" | "stargazerCount"
> & {
  owner: Pick<RepositoryOwner, "login">;
  viewerHasStarred: boolean;
};

const ListWrapper = ({
  data,
  emptyMessage = null,
  isLoading = false,
  handleStarClick = () => {},
}: {
  data: Array<RepositoryPart>;
  emptyMessage?: string | null;
  isLoading?: boolean;
  handleStarClick?: (id: Scalars["ID"], isStarred: boolean) => void;
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
                onClick={() => {
                  return handleStarClick(item.id, item.viewerHasStarred);
                }}
                color={item.viewerHasStarred ? "#1890ff" : ""}
              />,
            ]}
          >
            <List.Item.Meta
              title={
                item.owner?.login
                  ? `${item.owner.login}/${item.name}`
                  : item.name
              }
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListWrapper;
