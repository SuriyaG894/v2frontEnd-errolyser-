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
  constructor(private errorService:ErrorServiceService,private errorAnalyzerService:ErrorAnalyzerServiceService,private fileService: FileSharingService,private logCountService:LogCountServiceService){
    this.lastLoggedConsole = "";
    this.logFileName = "";
    this.logUpLoads = "0";
  }

  ngOnInit(): void {
      this.lastLoggedConsole = "IndexOutOfBound Exception"
      this.fileService.fileName$.subscribe(name => {
        this.logFileName = name;
      });
      this.logCountService.logCount$.subscribe(count=>{
        this.logUpLoads = count;
      })
      // this.logUpLoads = this.cookieService.get('counter');

      this.countErrorSearches();
      this.countNoOfRepo();
      
  }

  // santhan
  list:ErrorDetails[]=[]
  list1:ErrorDTO[]=[]
  totalConsoleSearches:number=0
  totalRepoList:number=0
  countErrorSearches(){
    this.errorAnalyzerService.getAllErrorDetails().subscribe(data=>{
      this.list = data;
      console.log(this.list)
      this.totalConsoleSearches = this.list.length;
    })
  }

  countNoOfRepo(){
    this.errorAnalyzerService.getAllErrors().subscribe(data=>{
     this.list1 = data
     
    this.totalRepoList = this.list1.length
    })
  }

}
