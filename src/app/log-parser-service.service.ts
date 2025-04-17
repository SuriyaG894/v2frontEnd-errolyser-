import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogParser } from './ilog-parser';

@Injectable({
  providedIn: 'root'
})
export class LogParserServiceService {

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
}
