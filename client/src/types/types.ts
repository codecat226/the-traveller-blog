export type InitialStateUser = {
  isLoggedIn: boolean;
  // firstRender: boolean;
  user: { name: string; email: string; phone: string };
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

export type ModalProps = {
  message: string;
  closeModal: Function;
};
