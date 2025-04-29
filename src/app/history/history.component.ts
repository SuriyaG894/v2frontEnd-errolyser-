import { Component, OnInit } from '@angular/core';
import { ErrorDetails } from '../models/error-details.model';
import { ErrorAnalyzerServiceService } from '../services/error-analyzer-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogParserServiceService } from '../log-parser-service.service';
import { ILogHistory } from '../ilog-history';
import { ILogParser } from '../ilog-parser';
import { ILogExceptionCount } from '../ilog-exception-count';
import { response } from 'express';
import { IStackTrace } from '../istack-trace';
// import { Modal } from 'bootstrap';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  searchText: string = '';
  errorDetailsList: ErrorDetails[] = [];
  newDetails: ErrorDetails[] = [];
  selectedStackTrace: string[] = [];
  isModalOpen: boolean = false;
  username:string=''
  logExceptionCountData:ILogExceptionCount[] = [];
  logExceptionHistoryDetailed:ILogParser[] =[];
  isModalLogDHOpen:boolean=false;
  modalStackTrace:IStackTrace[] = [];
  isModalStackTraceOpen:boolean=false;
  // isConsoleSelected: boolean = false;  
  // isLogSelected: boolean = false;
  selectedErrorDisplay:string='log'
  consoleErrorCount:ILogExceptionCount[]=[];
  consoleDetailedError:ErrorDetails[] =[]
  isModalConsoleDHOpen:boolean =false
  constructor(private errorDetailsService: ErrorAnalyzerServiceService,private parserService:LogParserServiceService) {}

  ngOnInit(): void {
    this.loadErrorDetails();
    this.username = localStorage.getItem('token') || ''
    this.loadLogExceptionCount();
    this.loadConsoleExceptionCount();
  }
  
  loadErrorDetails() {
    this.username = localStorage.getItem('token') || ''
    this.errorDetailsService.getAllErrorDetails(this.username).subscribe(data => {
      this.errorDetailsList = data;
      console.log(this.errorDetailsList); // Show all by default
      console.log(this.filterErrors());
    });
  }

  loadLogExceptionCount(){
    this.username = localStorage.getItem('token') || ''
    this.parserService.loadLogExceptionCount(this.username).subscribe({
      next:(response)=>{
        console.log(response)
      this.logExceptionCountData = response},
      error:(error)=>{console.log(error)}
    });
  }

  loadConsoleExceptionCount(){
    this.errorDetailsService.getConsoleErrorCount(this.username).subscribe({
      error:(error)=>{
        console.log(error)
      },
      next:(response)=>{
        this.consoleErrorCount = response;
        console.log(response);
      }
    })
  }

  filterErrors():ILogExceptionCount[] {
    console.log(this.consoleErrorCount);
    return this.consoleErrorCount.filter(error =>
      error.exceptionName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      error.count.toString().includes(this.searchText)
      );
      
}

filerLogCountErrors():ILogExceptionCount[]{
  return this.logExceptionCountData.filter(error =>
    error.exceptionName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
    error.count.toString().includes(this.searchText));
}

openDetailedLogHistory(exceptionName:string){
  this.parserService.loadLogHistoryExceptionDetail(this.username,exceptionName).subscribe(
    {
      next:(response)=>{this.logExceptionHistoryDetailed = response
        console.log(response);
      },
      error:(error)=>{console.log(error)}
    }
  );
  this.isModalLogDHOpen = true;

}

openDetailedConsoleHistory(exceptionName:string){
  this.errorDetailsService.getConsoleErrorByExceptionType(exceptionName,this.username).subscribe({
    next:(response)=>{console.log(response);
      this.consoleDetailedError = response;
      
    },
    error:(error)=>{console.log(error)}
  })
  this.isModalConsoleDHOpen = true;
}

openStackTraceView(stackTrace:IStackTrace[]){
  this.modalStackTrace = stackTrace;
  console.log(stackTrace);
  this.isModalStackTraceOpen=true;
}


// Change this
openStackTraceModal(error: string[]) {
  this.selectedStackTrace = error;
  this.isModalOpen = true;
  // Prevent scrolling of body when modal is open
  document.body.style.overflow = 'hidden';
}

// Close modal
closeModal() {
  this.isModalOpen = false;
  // Re-enable scrolling of body
  document.body.style.overflow = 'auto';
}

closeDHModal(){
  this.isModalLogDHOpen =false;
  this.isModalConsoleDHOpen = false;
  
}

closeStacktraceModal(){
  this.isModalStackTraceOpen=false;
}

}