import API from "../lib/axios/axios";
import { IBook, IUser } from "../lib/interface";

export const getListBook = async (): Promise<IBook[]> => {
  const res = await API.get("book");
  
  return res.data;
};

export const getSingleBook = async (id: number): Promise<IBook> => {
  const res = await API.get(`book/${id}`);
  return res.data;
};

export const addBook = async (data: IBook): Promise<IBook> => {
  try {
    const res = await API.post("book", data);
    return res.data;
  } catch (err) {
    throw new Error("Add new Book failed");
  }
};

export const editBook = async (id: any, book: IBook) => {
  try {
    const res = await API.patch(`book/${id}`, book);
    return res.data;
  } catch (err) {
    throw new Error("Edit Book failed");
  }
};

export const deleteBook = async (id: number) => {
  try {
    const res = await API.delete(`book/${id}`);
    return res.data;
  } catch (err) {
    throw new Error("Delete Book failed");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await API.post(`/auth/signin`, {
      email,
      password,
    });
 
    return res.data;
  } catch (err) {
    throw new Error("Login failed");
  }
}
export const signin = async (data: IUser) => {
  try {
    const res = await API.post(`/user/register`, data);
    return res.data;
  } catch (err) {
    throw new Error("Register failed");
  }
}
