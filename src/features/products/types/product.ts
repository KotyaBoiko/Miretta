export interface ProductBasic {
  img: string;
  title: string;
  price: number;
  id: string;
}

export interface Product extends Omit<ProductBasic, "img"> {
  type: string,
  category: string,
  collections: string[],
  colors: string[],
  description: string,
  images: string[],
  materials: string,
  sizes: string[],
  stock: number,
} 
