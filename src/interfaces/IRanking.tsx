import { inherits } from "util";
import { IBase } from "./Base/IBase";

export interface IRanking extends IBase {
  value: IRankingValue[];
}
export interface IRankingValue {
  top: number;
  userRankings: IUserRanking[];
}
export interface IUserRanking {
  userId: string;
  rank: number;
  nickName: string;
  experiencePoint: number;
}
