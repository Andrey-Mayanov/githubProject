import React, { useState } from "react";
import { useSubscription } from "@apollo/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { NOTIFY_NEW_PUBLIC_TODOS } from "api/subscriptions/todos";
import styled from "styled-components";
import { List, Spin } from "antd";
import { Link } from "react-router-dom";

const createApolloClient = () => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: "wss://hasura.io/learn/graphql",
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDYxOWI0NzNhNTIyY2RjMDA2OTAwMGYzMiJ9LCJuaWNrbmFtZSI6Im1heWFub3Y5NCIsIm5hbWUiOiJtYXlhbm92OTRAbWFpbC5ydSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9kYjBlODA3Y2FiYzU3MjYzYmEwODBkZGU3YzM5YTNkZT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRm1hLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIxLTExLTIyVDA3OjMxOjA4LjIxMFoiLCJpc3MiOiJodHRwczovL2dyYXBocWwtdHV0b3JpYWxzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MTliNDczYTUyMmNkYzAwNjkwMDBmMzIiLCJhdWQiOiJQMzhxbkZvMWxGQVFKcnprdW4tLXdFenFsalZOR2NXVyIsImlhdCI6MTYzNzU2NjI3MCwiZXhwIjoxNjM3NjAyMjcwLCJhdF9oYXNoIjoicmN6OWxKT1hZZlZzVXh2TWVabVB0USIsIm5vbmNlIjoiY35Qd3N5QmNrYjZUeENvblV6RndybWtrNXR5eUFISm8ifQ.rNhHe76obrL47PP9J-zcu49Ki7EoQtLLgYvzDqdDQEU4KRTDCQOsB92Fm6qGWqOfR_Xwk9l8AIt3xvL0xG7AB8x7MkMcLP2yGNp0kdg2XNP7L2EQE6G0SOneGju8Gc0zf0HWdQVtOso_h-6b1DTnRS1FypI_gOpPFOzJ_IDMjx0K1VmOqJNOsHOYawQ-pih4CdOukE13I3FJ_xCYqPksszl5D5JIbsq6-E7m3XyaIrMWv5HeEd8cpZ_GlfhCt9N9l3T2J9MxfjvJ5Tui1r6FXMzKWjFawSUoF_V4Wen8WABplbCPRlx1lDRbR7s1yfj3NiLcCUDYckRc76ZTBzGAUw`,
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  });
};

type ItemType = {
  id: string;
  last_seen: string;
  user: {
    name: string;
  };
};

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Todo = () => {
  const { loading, data } = useSubscription(NOTIFY_NEW_PUBLIC_TODOS);
  console.log(data);
  if (!data || loading) {
    return (
      <SpinWrapper>
        <Spin />
      </SpinWrapper>
    );
  }
  return (
    <div>
      <List
        itemLayout="vertical"
        dataSource={data.online_users}
        renderItem={(item: ItemType) => (
          <List.Item>
            <List.Item.Meta
              title={item.user.name}
              description={new Date(item.last_seen).toString()}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
`;

const LinkWrapper = styled(Wrapper)`
  display: flex;
  justify-content: end;
`;

const TodoPublicListSubscription = () => {
  const [client] = useState(createApolloClient());

  return (
    <ApolloProvider client={client}>
      <LinkWrapper>
        <Link to="/">Домой</Link>
      </LinkWrapper>
      <Wrapper>
        <Todo />
      </Wrapper>
    </ApolloProvider>
  );
};

export default TodoPublicListSubscription;
