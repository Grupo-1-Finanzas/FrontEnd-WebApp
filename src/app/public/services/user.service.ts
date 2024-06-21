import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";

import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'users';
  }

  // buscar por email y password
  findByEmailAndPassword(email: string, password: string){
    return this._http.get<any>(`${this.resourcePath()}/?email=${email}&password=${password}`);
  }
}
