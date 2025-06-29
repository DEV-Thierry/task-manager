export interface User {
  username: string;
  email: string;
  token: string;
  roles?: string[];
}

export interface RegisterUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
