import { useQuery } from "@apollo/client";
import { Avatar, Spin } from "antd";
import { GET_MYSELF } from "api/queries/user";
import useAuth from "hooks/useAuth";
import styled from "styled-components";

const SpinWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledAvatar = styled(Avatar)`
  height: 10rem;
  width: 10rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  > * {
    margin-bottom: 1rem;
  }
`;

const HomeContainer = () => {
  const { user } = useAuth();
  const { login = "" } = user || {};

  const { loading, data } = useQuery(GET_MYSELF, {
    variables: {
      login: login,
    },
  });

  if (loading) {
    return (
      <SpinWrapper>
        <Spin />
      </SpinWrapper>
    );
  }

  console.log(data);

  return (
    <InfoWrapper>
      <StyledAvatar src={data?.user.avatarUrl} />
      <div>
        <div>Имя: {data?.user.name}</div>
        <div>Число репозиториев: {data?.user.repositories.totalCount}</div>
        <div>Число подписчиков: {data?.user.followers.totalCount}</div>
        <div>
          <a href={data?.user.url} target="_blank" rel="noreferrer">
            Профиль на GitHub
          </a>
        </div>
      </div>
    </InfoWrapper>
  );
};

export default HomeContainer;
