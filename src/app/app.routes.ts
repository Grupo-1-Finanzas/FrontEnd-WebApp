import { Routes } from '@angular/router';
import {LoginPageComponent} from "./public/pages/login-page/login-page.component";
import {RegisterPageComponent} from "./public/pages/register-page/register-page.component";
import {HomePageComponent} from "./smart_wallet/pages/home-page/home-page.component";
import {HistorialPageComponent} from "./smart_wallet/pages/historial-page/historial-page.component";
import {OperationPageComponent} from "./smart_wallet/pages/operation-page/operation-page.component";

export const routes: Routes = [
  {path: '', redirectTo: "login", pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'home/:id', component: HomePageComponent},
  {path: 'historial/:id', component: HistorialPageComponent},
  {path: 'operations/:id', component: OperationPageComponent},
];
