import { Component, inject, OnInit } from '@angular/core';
import { ILogParser } from '../ilog-parser';
import { LogParserServiceService } from '../log-parser-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { IStackTrace } from '../istack-trace';
import { FileSharingService } from '../file-sharing.service';
import { CookieService } from 'ngx-cookie-service';
import { LogCountServiceService } from '../log-count-service.service';
import { IStackToObject } from '../istack-to-object';


@Component({
  selector: 'app-log',
  imports: [CommonModule,FormsModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent implements OnInit{

    showTable:boolean= false;
    fileup:boolean=false;
    counter:number = 0;

    logData:ILogParser[]=[];

    constructor(private parserService:LogParserServiceService,private fileService:FileSharingService,private cookieService:CookieService,private logCountService:LogCountServiceService){
      
    }

    getLog(){
      this.parserService.getLogs().subscribe(logs=>{
        this.logData =logs;
      });
    }

    ngOnInit(): void {
        this.getLog();
        this.logData.forEach(data=>{
          console.log(data.timestamp);
        });
    }

    readonly dialog = inject(MatDialog);

  openDialog(trace:IStackTrace[]) {
    const dialogRef = this.dialog.open(CustomDialogComponent,{
      data:trace,
      width: '80%',  // Set the width to 600px
    height: '80%',
    });
    
  }

  selectedFile: File | null = null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.parserService.deletePreviousLog().subscribe({
      next: (response) => {
        console.log('POST success:', response);
      },
      error: (error) => {
        console.error('POST error:', error);
      }
    });
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileService.updateFileName(this.selectedFile.name);
      this.counter++;
       this.logCountService.updateLogCount(this.counter.toString());
      // this.cookieService.set('counter', this.counter.toString());
      console.log("File selected:", this.selectedFile.name);
      this.fileup = true;
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      console.log("Uploading file:", this.selectedFile);
      // Here you can send it to backend using FormData
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.parserService.upload(formData).subscribe({
        next: (response) => {
          console.log('POST success:', response);
        },
        error: (error) => {
          console.error('POST error:', error);
        }
      });
      // You'd send `formData` using HttpClient
    } else {
      console.log("No file selected");
    }
  }

  saveAndAnalyse(){
    this.showTable = true;
    this.getLog();
  }


  downloadTableAsExcel(): void {
    const header = ['Id', 'Timestamp', 'Level', 'Thread', 'Exception Name', 'Error Message', 'Stack Trace'];
  
    const csvRows = this.logData.map(log => {
      // Format the timestamp if needed
      const timestamp = `"${log.timestamp}"`;  // Wrap timestamp in quotes
  
      // Flatten the stack trace array and escape characters
      const stackTrace = log.stackTrace
        .map(trace => {
          // Ensure the trace is well-formed JSON and escape quotes
          let traceString = JSON.stringify(trace);
  
          // Escape additional commas or quotes inside the trace string
          traceString = traceString.replace(/"/g, '""'); // Double quotes inside CSV
          return traceString;
        })
        .join(' | ');  // Join them into a single string, using a delimiter (e.g., ' | ') for readability
  
      // Return the CSV row with each value properly wrapped in quotes if needed
      return [
        log.id,
        `"${timestamp}"`,
        log.level,
        log.thread,
        log.exceptionName,
        log.errorMessage,
        `"${stackTrace}"`  // Wrap stack trace in quotes for CSV safety
      ].join(',');
    });
  
    // Join header and rows
    const csvContent = [header.join(','), ...csvRows].join('\n');
  
    // Trigger CSV download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'log_data.csv';
    link.click();
  }
  
    
}
