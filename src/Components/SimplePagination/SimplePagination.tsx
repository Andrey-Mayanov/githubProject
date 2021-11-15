import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Space, Button } from "antd";

const SimplePagination = ({
  nextPage,
  previousPage,
  disableNext,
  disablePrevious,
}: {
  nextPage: () => void;
  previousPage: () => void;
  disableNext: boolean;
  disablePrevious: boolean;
}) => {
  return (
    <Space>
      <Button
        disabled={disablePrevious}
        onClick={() => previousPage()}
        type="primary"
      >
        <LeftOutlined />
        Previous
      </Button>
      <Button disabled={disableNext} onClick={() => nextPage()} type="primary">
        Next
        <RightOutlined />
      </Button>
    </Space>
  );
};

export default SimplePagination;
