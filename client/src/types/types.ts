export type InitialStateUser = {
  isLoggedIn: boolean;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
