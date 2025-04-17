import { Component, inject, OnInit } from '@angular/core';
import { ILogParser } from '../ilog-parser';
import { LogParserServiceService } from '../log-parser-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { IStackTrace } from '../istack-trace';


@Component({
  selector: 'app-log',
  imports: [CommonModule,FormsModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent implements OnInit{


    logData:ILogParser[]=[];

    constructor(private parserService:LogParserServiceService){
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
    
}
