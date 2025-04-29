import { Answer } from "./answer";

export interface Question {
    id?: number;        
      text: string;
      username: string;
      answers?: Answer[];   
      likes?: number;    
      timestamp?: Date;
}
