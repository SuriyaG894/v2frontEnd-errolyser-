import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorServiceService } from '../services/error-service.service';
import { ErrorDTO } from '../models/error-dto.model';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorAnalyzerServiceService } from '../services/error-analyzer-service.service';


interface ErrorDetails {
  id?: number;
  exceptionType: string;
  errorMessage: string;
  errorType: string;
  lineNumber: number | null;
  fileName: string;
  stackTrace: string[];
  relevantCode: string;
  timestamp?: Date;
  errortype:string;
  username:string
}

@Component({
  selector: 'app-basic',
  imports:[CommonModule,FormsModule,RouterModule],
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent implements OnInit {
  errorText: string = '';
  errorDetails: ErrorDetails | null = null;
  showResult: boolean = false;
  isSaving: boolean = false;
  saveMessage: string = '';
  username:string=''
  constructor(private errorService: ErrorAnalyzerServiceService) {}

  ngOnInit(): void {
    this.username=localStorage.getItem('token') || ''
    console.log(this.username)
  }

  onSearchChange() {
    const input = this.errorText.trim();
    if (!input) {
      this.errorDetails = null;
      return;
    }
    this.errorDetails = this.extractErrorDetails(input);
    this.showResult = false; // Hide results until submit is clicked
  }

  onSubmit() {
    if (!this.errorDetails) {
      return;
    }

    this.username = localStorage.getItem('token') || ''

    if(this.errorDetails){
      this.errorDetails.username = this.username
    }
    
    this.showResult = true;
    
    // Save to backend
    this.isSaving = true;
    this.saveMessage = '';
    
    this.errorService.saveErrorDetails(this.errorDetails).subscribe({
      next: (response) => {
        this.username = localStorage.getItem('token') || ''
        this.isSaving = false;
        this.saveMessage = 'Error details saved successfully!';
        // Update with ID from the server
        if (response && response.id) {
          this.errorDetails = { 
            ...this.errorDetails, 
            id: response.id, 
            timestamp: response.timestamp, 
            exceptionType: this.errorDetails?.exceptionType || '', 
            errorMessage: this.errorDetails?.errorMessage || '', 
            errorType: this.errorDetails?.errorType || '', 
            fileName: this.errorDetails?.fileName || '', 
            stackTrace: this.errorDetails?.stackTrace || [], 
            relevantCode: this.errorDetails?.relevantCode || '',
            lineNumber: this.errorDetails?.lineNumber ?? null,
            errortype:this.errorDetails?.errortype || '',
            username:this.username
          };
        }
      },
      error: (error) => {
        this.isSaving = false;
        this.saveMessage = 'Failed to save error details. Please try again.';
        console.error('Error saving error details:', error);
      }
    });
  }
 
  extractErrorDetails(input: string): ErrorDetails {
    // Initialize the error details object
    const errorDetails: ErrorDetails = {
      exceptionType: '',
      errorMessage: '',
      errorType: '',
      lineNumber: null,
      fileName: '',
      stackTrace: [],
      relevantCode: '',
      errortype:'',
      username:this.username
    };

    // Generic patterns for different languages
    const patterns = {
      // Generic exception/error type patterns
      exceptionType: [
        // Java-style exceptions
        /(java\.\w+\.[A-Za-z0-9_]+Exception|java\.\w+\.[A-Za-z0-9_]+Error)/,
        // Generic language exceptions (PythonError, ReferenceError, etc.)
        /([A-Z][a-zA-Z0-9_]+(Exception|Error|Fault|Failure))/,
        // Framework specific errors
        /(TypeScript|React|Angular|Node|Python|Ruby|PHP|C\#|Rust|Go)(\s+)(Error|Exception|Failure)/i
      ],
      
      // Error type patterns
      errorType: [
        /(Error|Exception|Fault|Failure|RuntimeError|TypeError|SyntaxError|ReferenceError|ValueError)/
      ],

      // Error message patterns
      errorMessage: [
        /(?:Exception|Error|Fault|Failure):\s*(.*?)(?=\n|$)/,
        /(?:Caused by|because):\s*(.*?)(?=\n|$)/i,
        /(?:Message|Error message):\s*(.*?)(?=\n|$)/i
      ],

      // Line number patterns for different formats
      lineNum: [
        // Format: at Class.method(File.java:123)
        /at\s+[\w.$]+\.\w+\(([^:]+):(\d+)\)/,
        // Format: File "file.py", line 123
        /File\s+"([^"]+)",\s+line\s+(\d+)/,
        // Format: at filename:linenum:colnum
        /at\s+([^:]+):(\d+)(?::\d+)?/,
        // Format: filename, line x, in function_name
        /([^,]+),\s+line\s+(\d+)/,
        // Format: in filename on line X
        /in\s+([^\s]+)\s+on\s+line\s+(\d+)/
      ]
    };

    // Extract exception type
    for (const pattern of patterns.exceptionType) {
      const match = input.match(pattern);
      if (match) {
        errorDetails.exceptionType = match[0].trim();
        break;
      }
    }

    // Extract error type
    for (const pattern of patterns.errorType) {
      const match = input.match(pattern);
      if (match) {
        errorDetails.errorType = match[0].trim();
        break;
      }
    }

    // Extract error message
    for (const pattern of patterns.errorMessage) {
      const match = input.match(pattern);
      if (match && match[1]) {
        errorDetails.errorMessage = match[1].trim();
        break;
      }
    }

    // If we still don't have an error message, try to find anything after a colon
    if (!errorDetails.errorMessage) {
      const genericMessageMatch = input.match(/:\s*(.*?)(?=\n|$)/);
      if (genericMessageMatch && genericMessageMatch[1]) {
        errorDetails.errorMessage = genericMessageMatch[1].trim();
      }
    }

    // Extract stack trace
    // Match common stack trace formats from different languages
    const stackTraceLines = input.match(/(?:at|\s+File|\s+from|\s+in)\s+.+?(?:\n|$)/g);
    if (stackTraceLines) {
      errorDetails.stackTrace = stackTraceLines.map(line => line.trim());
    }

    // Extract line number and file name
    for (const pattern of patterns.lineNum) {
      const lineMatches = [...input.matchAll(new RegExp(pattern, 'g'))];
      
      if (lineMatches && lineMatches.length > 0) {
        // Usually the first match contains the most relevant line number
        const firstMatch = lineMatches[0];
        
        if (firstMatch && firstMatch.length >= 3) {
          errorDetails.fileName = firstMatch[1].trim();
          errorDetails.lineNumber = parseInt(firstMatch[2], 10);
          break;
        }
      }
    }

    // Extract relevant code snippet if present
    const codeSnippetMatch = input.match(/(?:\d+\s*\|.*\n){1,5}/);
    if (codeSnippetMatch) {
      errorDetails.relevantCode = codeSnippetMatch[0].trim();
    }

    if(!errorDetails.username){
      errorDetails.username = localStorage.getItem('token') || ''
    }

    return errorDetails;
  }


  downloadTableAsExcel(): void {
    const table = document.getElementById('console-table') as HTMLTableElement;
    if (!table) {
      console.error('Table not found!');
      return;
    }
  
    const csvData: string[] = [];
  
    for (let row of table.rows) {
      const rowArray: string[] = [];
      for (let cell of row.cells) {
        let cellText = cell.innerText.trim().replace(/"/g, '""'); // Escape quotes and trim whitespace
  
        // Wrap all cells in quotes to prevent Excel misinterpretation (especially for timestamps)
        rowArray.push(`"${cellText}"`);
      }
      csvData.push(rowArray.join(','));
    }
  
    const csvString = csvData.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'console-data.csv';
    link.click();
  }
  


}