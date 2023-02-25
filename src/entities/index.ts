
export interface Hour {
  readonly hour: number
  readonly minute: number
}

export type Period = [Hour, Hour];

export interface Dungeon {
  readonly healerNickName: string;
  readonly warriorNickname: string;
}
