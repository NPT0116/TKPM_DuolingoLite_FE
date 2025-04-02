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
  epEarned: number;
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
}

export interface IDisplayUnit {
  courseId?: string;
  type: number;
  title?: string;
  lessonsList?: ILessonValue[];
  lessonsInformation?: ILessonInformation[];
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
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
