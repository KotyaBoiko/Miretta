export interface IAddress {
  country: string,
  cityDescription: string,
  cityRef: string,
  cityTitle: string,
  address: string,
  postDescription: string,
  postRef: string,
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