import { User } from "..";

export interface UsersState {
  loggedUser?: User;
  loading: boolean;
  error: String;
}

