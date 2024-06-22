import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";

import {UserModel} from "../models/user.model";
import {FormControl, ɵValue} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'users';
  }

  // buscar por email y password
  findByEmail(email: string){
    return this._http.get<any>(`${this.resourcePath()}/?email=${email}`);
  }
  // buscar por dni
  findByDni(dni: ɵValue<FormControl<string | null>> | undefined){
    return this._http.get<any>(`${this.resourcePath()}/?dni=${dni}`);
  }
}
