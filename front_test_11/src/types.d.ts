export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phone: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  phone: string;
  token: string;
}
export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface IItem {
  _id: string,
  user: User,
  category: string,
  title: string,
  description: string,
  image: File | null,
  price: number;
}

export interface IItemMutation{
    category: string,
    title: string,
    description: string,
    image: File | null,
    price: number;
}

export interface ICategory {
  _id: string;
  title: string;
}