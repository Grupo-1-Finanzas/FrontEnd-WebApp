import { Component } from '@angular/core';
import {HistorialComponent} from "../../components/historial/historial.component";

@Component({
  selector: 'app-historial-page',
  standalone: true,
  imports: [
    HistorialComponent
  ],
  templateUrl: './historial-page.component.html',
  styleUrl: './historial-page.component.css'
})
export class HistorialPageComponent {

}
