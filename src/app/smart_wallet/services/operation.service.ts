import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OperationModel} from "../models/operation.model";
import {BaseService} from "../../shared/services/base.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OperationService extends BaseService<OperationModel>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'operations';
  }

  //buscar operation por userid
  findByUserId(userId: string | null){
    return this._http.get<OperationModel[]>(`${this.resourcePath()}/?userId=${userId}`);
  }
}
