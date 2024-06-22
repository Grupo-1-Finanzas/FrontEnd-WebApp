import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserModel} from "../../models/user.model";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInput} from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatDatepickerModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  dniExist: boolean= false;
  emailExist: boolean= false;
  registerForm = new FormGroup({
    dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
    name: new FormControl('', Validators.required),
    birth: new FormControl('', [Validators.required, this.ageValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    user: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      if (
        typeof formValue.dni === 'string' &&
        typeof formValue.name === 'string' &&
        typeof formValue.birth === 'string' &&
        typeof formValue.email === 'string' &&
        typeof formValue.user === 'string' &&
        typeof formValue.password === 'string'
      ) {
        this.userService.findByEmail(formValue.email).subscribe(users => {
          if (users.length === 0) {  // If the email does not exist in the database
            this.userService.findByDni(formValue.dni).subscribe(users => {
              if (users.length === 0) {  // If the dni does not exist in the database
                const newUser = new UserModel(
                  formValue.dni!,
                  formValue.name!,
                  formValue.birth!,
                  formValue.email!,
                  formValue.user!,
                  formValue.password!
                );
                console.log(newUser);
              } else {
                console.log('DNI already exists');
                this.dniExist=true;
              }
            });
          } else {
            console.log('Email already exists');
            this.emailExist=true;
          }
        });
      }
    }
  }
  resetEmailExist() {
    this.emailExist = false;
  }
  resetDniExist() {
    this.dniExist = false;
  }
  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value) {
      const birthDate = new Date(control.value);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (age < 18) {
        return { 'underage': true };
      }
    }
    return null;
  }
}
