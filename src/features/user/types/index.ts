export interface IAddress {
  country: string,
  city: string,
  address: string,
  postCode: string,
  priority: number,
} 

export interface IUser {
  name?: string,
  surname?: string,
  email: string,
  birth?: string,
  phone?: string,
  id: string,
  addresses?: IAddress[],
}