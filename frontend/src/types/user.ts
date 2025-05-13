export type UserData = {
  UserId: number;
  Username: string;
  Created_At: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
};

export type RegisterResponse = {
  success: boolean;
  data: UserData | null;
  msg: string;
};
