import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-registration',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private authenticationService:AuthenticationService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required],
    });
  }

  // Getter methods for easy access in the template
  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get role() {
    return this.registerForm.get('role');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authenticationService.registerUser(this.registerForm.value);
      console.log('Form Submitted:', this.registerForm.value);
      
    } else {
      this.registerForm.markAllAsTouched(); // Show validation messages if form is invalid
    }
  }

}
