export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  image: string | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  token: string;
  role: string;
  image?: string | null;
  displayName: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  error: {
    [key: string]: {
      message: string;
      name: string;
    },
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface ICocktails {
  name: string;
  image: string | null;
  recipe: string;
  ingredients: string;
  _id: string;
  user: string;
  isPublished: boolean;
}

export interface ICocktailMutation {
  name: string;
  image: string | null;
  recipe: string;
  ingredients: string;
}