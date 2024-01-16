import { User } from "./mutation";

export interface PageInput {
  offset: number;
  limit: number;
}

export interface UserNode {
  nodes: User[];
}

export interface Users {
  users: UserNode;
}
