export type UserType = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginType = {
  email: string;
  password: string;
};

export type AuthType = {
  user: UserType;
  isPending: boolean;
};
