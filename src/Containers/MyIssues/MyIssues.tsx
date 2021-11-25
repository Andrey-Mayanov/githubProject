import { useQuery } from "@apollo/client";
import { Badge, Space, Tooltip } from "antd";
import { GET_MY_ISSUE } from "api/queries/repository";
import ListWrapper from "components/ListWrapper";
import SimplePagination from "components/SimplePagination";
import { useMemo } from "react";
import styled from "styled-components";
import { Issue, IssueCommentConnection } from "types/repository";

const PAGE_SIZE = 10;

const StyledSpace = styled(Space)`
  width: 100%;
`;

const ToRightDiv = styled.div`
  display: flex;
  justify-content: end;
`;

type IssuePart = Pick<
  Issue,
  "id" | "title" | "body" | "closed" | "closedAt" | "url"
> & {
  comments: Pick<IssueCommentConnection, "totalCount">;
};

type QueryVariablesType = {
  first?: number;
  last?: number;
  before?: string;
  after?: string;
};

const IssueDescription = ({ issue }: { issue: IssuePart }) => {
  return (
    <div>
      <div>
        {issue.body ? (
          issue.body.length > 20 ? (
            <Tooltip title={issue.body}>
              {issue.body.substring(0, 20)}...
            </Tooltip>
          ) : (
            issue.body
          )
        ) : null}
      </div>
      <div>Comments: {issue.comments.totalCount}</div>
      <div>
        <a href={issue.url} target="_blank" rel="noreferrer">
          Посмотреть на GitHub
        </a>
      </div>
    </div>
  );
};

const IssueTitle = ({ issue }: { issue: IssuePart }) => {
  if (issue.closed) {
    return (
      <Badge.Ribbon text="Закрыто" color="pink">
        {issue.title}({new Date(issue.closedAt).toLocaleDateString()})
      </Badge.Ribbon>
    );
  }
  return <div>{issue.title}</div>;
};

const MyIssues = () => {
  const { loading, data, refetch } = useQuery(GET_MY_ISSUE, {
    variables: {
      first: PAGE_SIZE,
    },
    // pollInterval: 60000
  });

  const handleRefetch = (params: QueryVariablesType) => refetch(params);

  const previousPage = () => {
    handleRefetch({
      before: data?.search.pageInfo.startCursor,
      last: PAGE_SIZE,
    });
  };

  const nextPage = () => {
    handleRefetch({
      after: data?.search.pageInfo.endCursor,
      first: PAGE_SIZE,
    });
  };

  const listData = useMemo(() => {
    return (data?.search.nodes || []).map((item: IssuePart) => {
      return {
        description: <IssueDescription issue={item} />,
        title: <IssueTitle issue={item} />,
      };
    });
  }, [data]);

  return (
    <StyledSpace direction="vertical">
      <ToRightDiv>
        <SimplePagination
          nextPage={nextPage}
          disableNext={!data?.search.pageInfo.hasNextPage}
          disablePrevious={!data?.search.pageInfo.hasPreviousPage}
          previousPage={previousPage}
        />
      </ToRightDiv>
      <ListWrapper
        emptyMessage="Список пуст"
        isLoading={loading}
        data={listData}
      />
    </StyledSpace>
  );
};

export default MyIssues;
