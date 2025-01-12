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

export interface Resume {
  _id: string;
  fileName: string;
  content: string;
  url: string;
  hash: string;
  parsedContent: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMessage {
  content: string;
  role: "user" | "system";
}

export interface IInterview {
  _id: string;
  jobRole: string;
  jobDescription: string;
  resumeId: string;
  userId: string;
  isCompleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
