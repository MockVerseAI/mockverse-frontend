export interface Avatar {
  url: string;
  localPath: string;
  _id: string;
}

export interface User {
  _id: string;
  avatar: Avatar;
  username: string;
  email: string;
  loginType: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
