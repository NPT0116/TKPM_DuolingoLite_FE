export interface ILesson {
  id: string;
  title: string;
  xpEarned: number;
  order: number;
  question: any;
}
export interface ICourse {
  id: string;
  lessons: ILesson[];
  name: string;
  level: number;
}
export interface IDisplayUnit {
  type: number;
  title?: string;
  lessons?: ILesson[];
}
