import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userNotFound = false;

  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // @ts-ignore
      const email = this.loginForm.get('email').value;
      // @ts-ignore
      const password = this.loginForm.get('password').value;

      this.userService.findByEmailAndPassword(email, password).subscribe(response => {
        if (response.length>0) {
          // User found, proceed with login
          this.userNotFound = false;
          console.log('User found, proceed with login');
          console.log(response);
          console.log(response[0]);
          console.log(response[0].data);
          this.router.navigate(['/home', response[0].id]);
        } else {
          // User not found, show error message
          this.userNotFound = true;
          console.log('User not found');
        }
      });
    }
  }
}
