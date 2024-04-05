import { User } from "..";

export interface UsersState {
  users: User[];
  loggedUser?: User;
  loading: boolean;
  error: String;
}

