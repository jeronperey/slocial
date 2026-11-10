export type Category = "music" | "sports" | "party" | "movie" | "casual";

export interface SlocialEvent {
  id: string;
  title: string;
  category: Category;
  // TODO: date, time, address, description, price, restrictions, map position…
}

export interface User {
  name: string;
  email: string;
  phone: string;
  age: number;
}
