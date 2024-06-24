import { Component } from '@angular/core';
import {OperationComponent} from "../../components/operation/operation.component";

@Component({
  selector: 'app-operation-page',
  standalone: true,
  imports: [
    OperationComponent
  ],
  templateUrl: './operation-page.component.html',
  styleUrl: './operation-page.component.css'
})
export class OperationPageComponent {

}
