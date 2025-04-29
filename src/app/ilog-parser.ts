import { IStackTrace } from "./istack-trace";

export interface ILogParser {
    id:number,
    timestamp:string,
    level:string,
    thread:string,
    exceptionName:string,
    errorMessage:string,
    username:string,
    stackTrace:Array<IStackTrace>
}
