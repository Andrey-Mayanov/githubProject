import { List } from "antd";
import React from "react";

export interface ListWrapperProps {
  id: string;
  name: string;
  description: string;
}

const ListWrapper = ({ data }: { data: Array<ListWrapperProps> }) => (
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

export default ListWrapper;
