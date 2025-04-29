import { Question } from "./question";
import { Reply } from "./reply";

export interface Answer {
    id: number;
  text: string;
  username: string;
  likes: number;
  question?: Question;
  replies: Reply[]; // This should be an array of Reply objects
  timestamp?: Date;
}
