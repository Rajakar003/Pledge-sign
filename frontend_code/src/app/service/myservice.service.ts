import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  httpService : any;
  constructor(private http:HttpClient) {
   }
    apiBaseUrl = "http://localhost:8006" ;

    ChatBot(formData:any){
      console.log("chat api hit")
       return this.http.post(`${this.apiBaseUrl}/sendmsg`, formData)
   }
   signUp(formData) {
    return this.http.post(`${this.apiBaseUrl}/SignUp`, formData)
   }
   ClientImage(formData){
    return this.http.post(`${this.apiBaseUrl}/ClientImage`, formData)
   }

  fetchCountUsers():Observable<any>{
    return this.http.get(`${this.apiBaseUrl}/CountUsers`)
   }
   userFetch():Observable<any>{
     return this.http.get(`${this.apiBaseUrl}/FetchClientInfo`)
   }


  }