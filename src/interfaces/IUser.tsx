export interface IUserProgress {
  courseId: string;
  lessonOrder: number;
  userId: string;
}
export interface IUserStats {
  userId: string;
  experiencePoint: number;
  heart: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // You may convert this to Date if needed
  id: string;
}

export interface IUser {
  find(arg0: (u: any) => boolean): unknown;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  nickName: string;
  profileImageUrl: string | null;
  subscription: unknown | null; // Change `unknown` to a more specific type if you know the structure
  userActivities: any[]; // Change `any` to a more specific type if available
  userStats: IUserStats;
}
