import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorDTO } from '../models/error-dto.model';
import { ErrorAnalyzerServiceService } from '../services/error-analyzer-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-error',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-new-error.component.html',
  styleUrl: './add-new-error.component.css'
})
export class AddNewErrorComponent {

  addErrorForm:FormGroup;
  errorData:ErrorDTO={title:'',category:'',howToFix:'',beforeExample:'',afterExample:'',notes:'',stacktrace:'',username:''};

  constructor(private fb:FormBuilder,private errorService:ErrorAnalyzerServiceService,private router:Router){
    this.addErrorForm = this.fb.group({
      title:['',Validators.required],
      category:['',Validators.required],
      howToFix:['',Validators.required],
      beforeExample:['',Validators.required],
      afterExample:['',Validators.required],
      notes:['',Validators.required],
      stacktrace:['',Validators.required],
      username:localStorage.getItem('token') || ''
    });
  }
  ngOnInit(): void {
  }


  get title() { return this.addErrorForm?.get('title'); }
  get category() { return this.addErrorForm?.get('category'); }
  get howToFix() { return this.addErrorForm?.get('howToFix'); }
  get beforeExample() { return this.addErrorForm?.get('beforeExample'); }
  get afterExample() { return this.addErrorForm?.get('afterExample'); }
  get notes() { return this.addErrorForm?.get('notes'); }
  get stacktrace() { return this.addErrorForm?.get('stacktrace'); }



  onSubmit(){
    if(this.addErrorForm.valid){
      this.errorData = this.addErrorForm.value;
      this.errorService.saveNewError(this.errorData).subscribe(()=>{
        console.log(this.errorData);
        this.router.navigate(['/repo']);
      })
    }
    else{
      console.log("invalid details");
    }

  }
}
