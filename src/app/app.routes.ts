import { Routes } from '@angular/router';
import {LoginComponent} from "./public/components/login/login.component";
import {LoginPageComponent} from "./public/pages/login-page/login-page.component";
import {RegisterPageComponent} from "./public/pages/register-page/register-page.component";

export const routes: Routes = [
  {path: '', redirectTo: "login", pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
];
