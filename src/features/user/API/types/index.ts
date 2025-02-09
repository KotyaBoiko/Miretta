export interface IUserPersonalInfo {
  name?: string,
  surname?: string,
  email: string,
  birth?: string,
  phone?: string,
  id: number,
}


export interface IUser extends IUserPersonalInfo {
  likedProducts?: string[],
  orders?: string[],
}