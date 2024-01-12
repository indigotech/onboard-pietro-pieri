import React, { useEffect, useState, useRef } from "react";
import { FlatList, Text, ActivityIndicator } from "react-native";
import { User } from "../interfaces/mutation";
import { USERS } from "../apollo/query";
import { useQuery } from "@apollo/client";
import { renderItem } from "../utils/render";
import { PageInput, Users } from "../interfaces/query";
import { pageInputIni } from "../utils/pages";

interface UserListProps {
  token: string | null;
}

export const UserList: React.FC<UserListProps> = ({ token }) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const page = useRef<PageInput>(pageInputIni);
  const [userList, setUserList] = useState<User[]>([]);

  const { error, data, fetchMore } = useQuery<Users>(USERS, {
    variables: {
      usersData2: { offset: page.current.offset, limit: page.current.limit },
    },
    context: {
      headers: {
        authorization: token,
      },
    },
  });

  useEffect(() => {
    if (data?.users.nodes) {
      setUserList((prevList) => [...prevList, ...data.users.nodes]);
    }
    setInitialLoading(false);
  }, [data]);

  useEffect(() => {
    if (!loadingMore) return;

    if (data?.users.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          data: {
            offset: page.current.offset + page.current.limit,
            limit: page.current.limit,
          },
        },
      }).then(() => {
        setLoadingMore(false);
        page.current.offset += page.current.limit;
      });
    } else {
      setLoadingMore(false);
    }
  }, [loadingMore, data]);

  const handleEndReached = () => {
    if (!loadingMore) {
      setLoadingMore(true);
    }
  };

  if (initialLoading) {
    return <ActivityIndicator color="black" size="large" />;
  }

  if (error) {
    return <Text>Ocorreu um ao carregar os usuários: {error.message}</Text>;
  }

  return (
    <FlatList
      data={userList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        loadingMore ? <ActivityIndicator color="black" /> : null
      }
    />
  );
};
