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

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
