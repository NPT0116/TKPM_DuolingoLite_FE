export interface UserActivity {
  userId: string;
  date: string;
  isActive: boolean;
  id: string;
}

export interface UserStats {
  userId: string;
  experiencePoint: number;
  heart: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  id: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  nickName: string;
  profileImageUrl: string | null;
  subscription: any | null;
  userActivities: UserActivity[];
  userStats: UserStats;
}

export interface ApiResponse<T> {
  value: T;
  isSuccess: boolean;
}
