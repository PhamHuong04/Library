import { Catagory } from "./enum";

export interface IBook {
  bookcode: number;
  title: string;
  author: string;
  description: string;
  date: string;
  catagory: Catagory;
  numberPage: number;
  price: number;
  image ?: IImgageBook;
}
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  roles: string;
}

export interface IImgageBook {
  id: string;
  filename: string;
  path: string;
  mimetype: string;
}