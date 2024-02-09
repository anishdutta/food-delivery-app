
export interface IUser {
  id: number,
  name: string;
  email?: string;
  username?: string;
  phoneNumber?: string;
  role: IUserRoles,
  isVerified?: boolean,
  password: string
  createdAt: Date,
  updatedAt: Date,
  otp?: string;
  token?: string;
}

export enum IUserIdentifier{
  PHONENUMBER = 'phoneNumber',
  EMAIL = 'email',
  USERNAME = 'username'
}

export enum IUserRoles{
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  DELIVERY = 'delivery'
}

export type ICreateUserRequest  = Omit<IUser,'id' | 'otp' | 'token'>

export type IRegisterUserRequest  = Omit<IUser,'id' | 'isVerified' | 'createdAt' | 'updatedAt' | 'otp' | 'token'>


export type ILoginUserRequest  = Omit<IUser,| 'isEmailVerified' | 'name'>;

