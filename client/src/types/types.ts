export type InitialStateUser = {
  isLoggedIn: boolean;
  user: { name: string; email: string; phone: string };
};

export type InitialStateBlog = {
  error: string;
  loading: boolean;
  blogs: Blog[];
};

export type Blog = {
  title: string;
  author: string;
  publishDate: string;
  body: string;
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

export type VerifyUser = {
  email: string;
};

export type ForgotUser = {
  email: string;
};

export type ResetUser = {
  password: string;
};

export type ModalProps = {
  message: string;
  closeModal: Function;
};
