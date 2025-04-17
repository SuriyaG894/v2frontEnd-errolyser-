import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ErrorDetails } from '../models/error-details.model';
import { ErrorServiceService } from '../services/error-service.service';
import { ErrorAnalyzerServiceService } from '../services/error-analyzer-service.service';
import { FileSharingService } from '../file-sharing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatIconModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  lastLoggedConsole:string;
  logFileName:string;
  logUpLoads?:string = "";
  constructor(private errorService:ErrorServiceService,private errorAnalyzerService:ErrorAnalyzerServiceService,private fileService: FileSharingService){
    this.lastLoggedConsole = "";
    this.logFileName = "";
    this.logUpLoads = "0";
  }

  ngOnInit(): void {
      this.lastLoggedConsole = "IndexOutOfBound Exception"
      this.fileService.fileName$.subscribe(name => {
        this.logFileName = name;
      });
      
      
  }

  // santhan
  list:ErrorDetails[]=[]
  totalConsoleSearches:number=0
  countErrorSearches(){
    this.errorAnalyzerService.getAllErrorDetails().subscribe(data=>{
      this.list = data;
      this.totalConsoleSearches = this.list.length;
    })
  }

}
