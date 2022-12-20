
export interface IBook {
  bookcode: number;
  title: string;
  author: string;
  description: string;
  date: string;
  catagory: string;
  numberPage: number;
  price: number;
  image: {
    id: number;
    path: string;
  };
}

