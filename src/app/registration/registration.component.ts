import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private authenticationService:AuthenticationService,private router:Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      authority: ['ROLE_USER', Validators.required],
    });
  }

  // Getter methods for easy access in the template
  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get authority() {
    return this.registerForm.get('authority');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authenticationService.registerUser(this.registerForm.value).subscribe(data=>{
        console.log(data);
      });
      console.log('Form Submitted:', this.registerForm.value);
      this.router.navigate(['/login']);
    } else {
      this.registerForm.markAllAsTouched(); // Show validation messages if form is invalid
    }
  }

}
