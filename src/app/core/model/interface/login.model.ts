export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  id: string;
  username: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  isRegistered: boolean;
}
