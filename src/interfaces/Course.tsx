export interface ILesson {
  error: IError;
  isFailure: boolean;
  isSuccess: boolean;
  value: ILessonValue[];
}
export interface ILessonValue {
  id: string;
  title: string;
  order: number;
  questions: any[];
  questionCount?: number;
  xpEarned: number;
}
export interface ICourse {
  error: IError;
  isFailure: boolean;
  isSuccess: boolean;
  value: ICourseValue[];
}
export interface ICourseValue {
  id: string;
  level: number;
  name: string;
  nextCourse: string | null;
  lessons: ILessonValue[];
}

export interface IUserCourseValue {
  courseId: string;
  lessonOrder: number;
  userId: string;
  lessons?: ILessonValue[];
}

export interface IDisplayUnit {
  courseId?: string;
  type: number;
  title?: string;
  lessonsList?: ILessonValue[];
  lessonsInformation?: ILessonInformation[];
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
}
export interface IError {
  code: string;
  description: string;
  type: number;
}
export interface ILessonInformation {
  id: string;
  title: string;
  order: number;
  questionCount: number;
  xpEarned: number;
}

export interface IResponse {
  error: IError;
  isFailure: boolean;
  isSuccess: boolean;
  value: any;
}
// register course
export interface IRegisteredCourse {
  courseId: string;
  lessonOrder: number;
  totalLesson: number;
  courseName: string;
  isCompleted: boolean;
}
