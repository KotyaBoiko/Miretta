export interface ProductBasic {
  img: string;
  title: string;
  price: number;
  stock: number
  id: string;
}

export interface Product extends Omit<ProductBasic, "img"> {
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
