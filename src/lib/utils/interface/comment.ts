import { IUser } from "./user";

export interface IComment {
  content: string;
  createdAt: string;
  id: number;
  rate: number;
  user: IUser;
  bookcode: number;
  book: any;
}
