import { Answer } from "./answer";

export interface Reply {
    id: number;     
  text: string;     
  username: string;     
  likes: number;     
  answer?: Answer;
  timestamp?: Date;
}
