import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ErrorDetails } from '../models/error-details.model';
import { ErrorServiceService } from '../services/error-service.service';
import { ErrorAnalyzerServiceService } from '../services/error-analyzer-service.service';
import { FileSharingService } from '../file-sharing.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LogCountServiceService } from '../log-count-service.service';
import { ErrorDTO } from '../models/error-dto.model';
import { LogParserServiceService } from '../log-parser-service.service';
import { response } from 'express';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Add this
  imports: [MatIconModule,CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  lastLoggedConsole:string;
  logFileName:string;
  logUpLoads:string = "0";
  username:string;
  recentRepo:string;
  constructor(private errorService:ErrorServiceService,private errorAnalyzerService:ErrorAnalyzerServiceService,private fileService: FileSharingService,private logCountService:LogCountServiceService,private parserService:LogParserServiceService){
    this.lastLoggedConsole = "";
    this.logFileName = "";
    this.logUpLoads = "0";
    this.username="";
    this.recentRepo ="";
  }

  ngOnInit(): void {
      this.lastLoggedConsole = "IndexOutOfBound Exception"
      this.logCountService.logCount$.subscribe(count=>{
        this.logUpLoads = count;
      })
      // this.logUpLoads = this.cookieService.get('counter');

      this.countErrorSearches();
      this.countNoOfRepo();
      this.username = localStorage.getItem('token') || ''
      this.loadLogFileName()
      this.loadLogFileCount()
  }

  // santhan
  list:ErrorDetails[]=[]
  list1:ErrorDTO[]=[]
  totalConsoleSearches:number=0
  totalRepoList:number=0
  j:number = 0
  lastThreeSearches:string=""
  countErrorSearches(){
     this.username = localStorage.getItem('token') || ''
    this.errorAnalyzerService.getAllErrorDetails(this.username).subscribe(data=>{
      this.list = data;
      console.log(this.list)
      this.totalConsoleSearches = this.list.length;
      this.lastThreeSearches = this.list.slice(-1)[0].exceptionType.substring(10);
    })
  }
  

  countNoOfRepo(){
    this.errorAnalyzerService.getAllErrors().subscribe(data=>{
     this.list1 = data
     
    this.totalRepoList = this.list1.length
    })
  }

  loadLogFileName(){
    this.parserService.getLogFileName(this.username).subscribe({
      next:(response)=>{console.log(response)
        this.logFileName  = response
        console.log(this.logFileName+ "Suriya")
        console.log(response);
      },
      error:(error)=>{
        console.log(error)
      }
    });
  }

  loadLogFileCount(){
    this.parserService.getLogFileCount(this.username).subscribe({
      next:(response)=>{console.log(response)
        this.logCountService.updateLogCount(response) 
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

}
