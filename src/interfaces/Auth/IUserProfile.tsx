import { ISubscription } from "../ISubscription";

export interface IUserActivity {
  userId: string;
  date: string;
  isActive: boolean;
  id: string;
}

export interface IUserStats {
  userId: string;
  experiencePoint: number;
  heart: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  id: string;
}

export interface IUserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  nickName: string;
  profileImageUrl: string | null;
  subscription: ISubscription | null;
  userActivities: IUserActivity[];
  userStats: IUserStats;
}
