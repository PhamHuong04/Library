
export interface IBook {
  bookcode: number;
  title: string;
  author: string;
  description: string;
  date: string;
  catagory: number;
  numberPage: number;
  price: number;
  image?: IImgageBook;
}
export interface IImgageBook {
  id: string;
  path: string;
  url: string;
}


export enum Catagory {
  HISTORY,
  TEXTBOOK,
  NOVEL,
  COMIC,
  POEM,
  SELFHELP,
}