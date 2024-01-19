import React, { useState, useRef } from "react";
import {
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { User } from "../interfaces/mutation";
import { USERS } from "../apollo/query";
import { useQuery } from "@apollo/client";
import { renderItem } from "../utils/render";
import { PageInput, Users } from "../interfaces/query";
import { pageInputInitialValue } from "../utils/pages";

export const UserList = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const page = useRef<PageInput>(pageInputInitialValue);
  const pageLimit = 20;
  const [refreshing, setRefreshing] = useState(false);
  const [userList, setUserList] = useState<User[]>([]);

  const { error, data, fetchMore, refetch } = useQuery<Users>(USERS, {
    variables: {
      input: { offset: page.current.offset, limit: pageLimit },
    },
    onCompleted: (data) => {
      if (data.users.nodes) {
        setUserList(userList.concat(data.users.nodes));
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

  const handleRefresh = () => {
    setRefreshing(true);
    page.current.offset = 0;
    setUserList([]);
    refetch({
      input: { offset: page.current.offset, limit: pageLimit },
    }).then(() => {
      setRefreshing(false);
    });
    setUserList(data?.users.nodes || []);
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
      keyExtractor={(item, index) => item.id + index.toString()}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        loadingMore ? <ActivityIndicator color="black" /> : null
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};
