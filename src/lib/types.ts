export type UserDataType = {
  fullName: string;
  email: string;
  password: string;
  _id?: string;
  role?: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type ContactDataType = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type AuthUserType = {
  email: string;
  role: string;
};

export type ContactType = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};
