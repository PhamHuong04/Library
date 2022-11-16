import { Catagory } from "./enum";

export interface IBook {
  bookcode: number;
  title: string;
  author: string;
  description: string;
  date: string;
  catagory: Catagory;
  numberPage: number;
  image: string;
}
export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}