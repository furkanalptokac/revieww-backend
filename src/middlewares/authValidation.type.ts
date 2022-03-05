export interface IRegisterValidation {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  bio?: string;
  languages?: string[];
}

export interface ILoginValidation {
  email: string;
  password: string;
}
