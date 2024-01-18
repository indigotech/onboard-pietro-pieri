import React, { useState, useRef } from "react";
import { FlatList, Text, ActivityIndicator } from "react-native";
import { User } from "../interfaces/mutation";
import { USERS } from "../apollo/query";
import { useQuery } from "@apollo/client";
import { renderItem } from "../utils/render";
import { PageInput, Users } from "../interfaces/query";
import { pageInputInitialValue } from "../utils/pages";

interface UserListProps {
  token: string | null;
}

export const UserList: React.FC<UserListProps> = ({ token }) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const page = useRef<PageInput>(pageInputInitialValue);
  const pageLimit = 20;
  const [userList, setUserList] = useState<User[]>([]);

  const { error, data, fetchMore } = useQuery<Users>(USERS, {
    variables: {
      input: { offset: page.current.offset, limit: pageLimit },
    },
    context: {
      headers: {
        authorization: token,
      },
    },
    onCompleted: (data) => {
      if (data.users.nodes) {
        setUserList((prevList) => [...prevList, ...data.users.nodes]);
      }
      setInitialLoading(false);
    },
  });

  const handleEndReached = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      if (data?.users.pageInfo.hasNextPage) {
        fetchMore({
          variables: {
            input: {
              offset: page.current.offset + pageLimit,
              limit: pageLimit,
            },
          },
        }).then(() => {
          setLoadingMore(false);
          page.current.offset += pageLimit;
        });
      } else {
        setLoadingMore(false);
      }
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
