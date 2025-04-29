import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogParser } from './ilog-parser';
import { ILogHistory } from './ilog-history';
import { ILogExceptionCount } from './ilog-exception-count';

@Injectable({
  providedIn: 'root'
})
export class LogParserServiceService {

  getLogFileName(username:string):Observable<any>{
    return this.http.get(`${this.baseUrl}getLogFileName/${username}`,{responseType:'text'as'json'});
  }

  getLogFileCount(username:string):Observable<any>{
    return this.http.get(`${this.baseUrl}getLogFileCount/${username}`);
  }

  loadLogHistoryExceptionDetail(username:string,exceptionName:string):Observable<any>{
    return this.http.get(`${this.baseUrl}getLogHistoryExceptionDetail/${exceptionName}/${username}`)
  }

  loadLogExceptionCount(username: string): Observable<ILogExceptionCount[]> {
    return this.http.get<ILogExceptionCount[]>(`${this.baseUrl}getLogExceptionCount/${username}`);
  }
  
  loadLogHistory(username: any):Observable<any> {
    return this.http.get(`${this.baseUrl}getLogHistory/${username}`);
  }
  saveLogInHistoryCombined(logData: ILogParser[]):Observable<any> {
    // console.log(JSON.stringify(logData));
    return this.http.post(`${this.baseUrl}saveCombinedLogHistory`,logData);
    
  }

  baseUrl:string = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  getLogs(): Observable<ILogParser[]> {
    return this.http.get<ILogParser[]>(this.baseUrl);
  }

  upload(formData: FormData): Observable<HttpEvent<any>> {
    

    const req = new HttpRequest('POST', `${this.baseUrl}upload`, formData,{responseType: 'text' as 'json'});

    return this.http.request(req);
  }

  deletePreviousLog():Observable<any>{
    return this.http.delete(`${this.baseUrl}deleteLog`,{responseType:'text'as'json'});
  }

  saveLogHistory(logHistory:ILogHistory):Observable<any>{
    return this.http.post(`${this.baseUrl}logHistory`,logHistory);
  }

  getLogCount(){
    return this.http.get(`${this.baseUrl}`);
  }


}
