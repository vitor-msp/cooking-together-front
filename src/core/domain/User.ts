export type User = {
  id?: string;
  name?: string;
};

export type CurrentUser = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  tokenType?: string;
  token?: string;
};