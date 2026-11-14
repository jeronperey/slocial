export type Category = "music" | "sports" | "party" | "movie" | "casual";

export interface SlocialEvent {
  id: string
  title: string
  category: Category
  lat: number
  lng: number
  date: string
  address : string
  description?: string
  restrictions?: string
  time?: string,
  price? : number
  // TODO: date, time, address, description, price, restrictions, map position…
}

export interface User {
  name: string;
  email: string;
  phone: string;
  age: number;
}
