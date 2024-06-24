import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {OperationModel} from "../../models/operation.model";
import {OperationService} from "../../services/operation.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [MatTableModule, DatePipe, DecimalPipe],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit{
  operations: OperationModel[] = [];
  displayedColumns: string[] = ['id','moneda', 'capital', 'cuotas', 'cuota_inicial', 'fecha', 'proximo_pago','plazo_gracia', 'periodo_gracia', 'tipo_tasa', 'capitalizacion', 'tasa', 'total'];
// Mapeo de capitalización
  capitalizationMap = {
    Diaria: 360,        // Ejemplo: 365 días para capitalización diaria
    Quincenal: 24,      // Ejemplo: 24 quincenas para capitalización quincenal
    Mensual: 12,        // Ejemplo: 12 meses para capitalización mensual
    Bimestral: 6,       // Ejemplo: 6 bimestres para capitalización bimestral
    Trimestral: 4,      // Ejemplo: 4 trimestres para capitalización trimestral
    Cuatrimestral: 3    // Ejemplo: 3 cuatrimestres para capitalización cuatrimestral
    // Agrega más según sea necesario
  };
  constructor(private route: ActivatedRoute,private operationService: OperationService) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.operationService.findByUserId(userId).subscribe(operations => {
      this.operations = operations;
    });
  }
  calculateTotal(operation: OperationModel): number {
    console.log('Calculating total for operation:', operation);

    const initialFee = this.calculateInitialFee(operation);
    const remainingCapital = operation.creditValue - initialFee;

    console.log('Initial fee:', initialFee);
    console.log('Remaining capital:', remainingCapital);

    let totalToPay = 0;

    if (operation.gracePeriod) {
      totalToPay = this.calculateWithGracePeriod(operation, remainingCapital);
    } else {
      totalToPay = this.calculateWithoutGracePeriod(operation, remainingCapital);
    }

    console.log('Total to pay:', totalToPay);
    return totalToPay;
  }

  calculateInitialFee(operation: OperationModel): number {
    return operation.numberOfInstallments > 1
      ? (operation.initialFeePercentage * operation.creditValue) / 100
      : operation.creditValue;
  }

  calculateWithGracePeriod(operation: OperationModel, remainingCapital: number): number {
    const ratePerPeriod = this.getRatePerPeriod(operation);
    const effectivePeriods = operation.numberOfInstallments - operation.gracePeriodNumber;
    const totalWithGrace = remainingCapital * Math.pow(1 + ratePerPeriod, effectivePeriods);
    return totalWithGrace;
  }

  calculateWithoutGracePeriod(operation: OperationModel, remainingCapital: number): number {
    const ratePerPeriod = this.getRatePerPeriod(operation);
    const totalWithoutGrace = remainingCapital * Math.pow(1 + ratePerPeriod, operation.numberOfInstallments);
    return totalWithoutGrace;
  }

  getRatePerPeriod(operation: OperationModel): number {
    // @ts-ignore
    const capitalization = this.capitalizationMap[operation.capitalization]; // Obtener el valor numérico de capitalization

    if (operation.rateType.toLowerCase() === 'nominal') {
      return operation.rateValue / 100 / capitalization;
    } else {
      const annualRate = 1 + operation.rateValue / 100;
      return Math.pow(annualRate, 1 / capitalization) - 1;
    }
  }
}
