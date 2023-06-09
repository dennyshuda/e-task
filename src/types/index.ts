import { ReactNode } from "react";

export interface Children {
  children: ReactNode;
}

export interface UserType {
  id: string;
  displayName: string;
  email: string;
  online: boolean;
  photoURL: string;
}

export interface TasksType {
  id: string;
  title: string;
  duedate: string;
  description: string;
  complete: boolean;
  category: string;
  comment: string[];
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  users: UserType[];
}
