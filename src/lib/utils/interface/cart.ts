import { IBook } from "./product";

export interface ICartItem {
  product: IBook;
  quantity: number;
}
