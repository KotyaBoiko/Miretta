export interface IProductBasic {
  img: string;
  title: string;
  price: number;
  stock: number
  id: string;
}

export interface IProduct extends Omit<IProductBasic, "img"> {
  type: string,
  category: string,
  collections: string[],
  description: string,
  images: string[],
  materials: string,
  sizes: {
    [key: string]: number
  },
  colors: string[],
} 
