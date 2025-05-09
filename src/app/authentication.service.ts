import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl:string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  registerUser(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/register`,data);
  }

  loginUser(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,data,{responseType:'text' as 'json'});
  }


}
