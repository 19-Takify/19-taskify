export type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Login = {
  email: string;
  password: string;
};

export type Auth = {
  user: User;
  isPending: boolean;
};
