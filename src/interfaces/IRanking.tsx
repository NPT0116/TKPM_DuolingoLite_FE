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
  profileImageUrl?: string | undefined;
  userId: string | undefined;
  rank: number | undefined;
  nickName: string | undefined;
  experiencePoint: number | undefined;
}
