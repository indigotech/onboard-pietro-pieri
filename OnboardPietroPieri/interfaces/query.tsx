import { User } from "./mutation";

export interface PageInfo {
  offset: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PageInput {
  offset: number;
  limit: number;
}

export interface Users {
  users: UserNode;
}
export interface UserNode {
  nodes: User[];
  count: number;
  pageInfo: PageInfo;
}

export interface UserOutput {
  user: User;
}
