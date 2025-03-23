export interface ICartProduct {
  id: string,
  variantId: string,
  title: string,
  price: number,
  stock: number,
  quantity: number,
  size: string,
  sizes: {
    [key: string]: number
  },
  image: string,
  color: string,
  colors: string[],
}