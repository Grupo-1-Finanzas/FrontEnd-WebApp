import { Component, OnInit } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {ReactiveFormsModule, FormsModule, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {UserService} from "../../../public/services/user.service";
import {OperationService} from "../../services/operation.service";
import {OperationModel} from "../../models/operation.model";

@Component({
  selector: 'app-operation',
  standalone: true,
  imports: [ReactiveFormsModule,MatSelectModule,MatCheckboxModule, MatRadioButton, MatRadioGroup, FormsModule, MatFormField, MatInput, MatCardModule],
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.css'
})
export class OperationComponent implements OnInit{
  operationForm: FormGroup = new FormGroup({});
  userTotalCredit!: number;

  constructor(private operationService: OperationService,private route: ActivatedRoute, private userService: UserService) {}

  capitalizationTime = ['Diaria','Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Cuatrimestral'];
  rateTimes = ['Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Cuatrimestral'];
  paymentFrequencies = ['Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Cuatrimestral'];
  gracePeriods = ['Sin P.G.', 'Parcial', 'Total'];
  gracePeriodNumbers = [1, 2, 3];

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    // Create the form before fetching the user data
    this.createForm();

    // Subscribe to the value changes of the numberOfInstallments form control
    this.operationForm.get('numberOfInstallments')?.valueChanges.subscribe(value => {
      const initialFeePercentageControl = this.operationForm.get('initialFeePercentage');
      if (value <= 1) {
        // Disable the initialFeePercentage form control if the number of installments is less than or equal to 1
        initialFeePercentageControl?.disable();
        initialFeePercentageControl?.clearValidators();
      } else {
        // Enable the initialFeePercentage form control if the number of installments is greater than 1
        initialFeePercentageControl?.enable();
        initialFeePercentageControl?.setValidators([Validators.required, Validators.min(10), Validators.max(60)]);
      }
      initialFeePercentageControl?.updateValueAndValidity();
    });

    this.operationForm.get('rateType')?.valueChanges.subscribe(value => {
      const capitalizationControl = this.operationForm.get('capitalization');
      if (value !== 'Nominal') {
        // Disable the capitalization form control if the rate type is not 'Nominal'
        capitalizationControl?.disable();
        capitalizationControl?.clearValidators();
      } else {
        // Enable the capitalization form control if the rate type is 'Nominal'
        capitalizationControl?.enable();
        capitalizationControl?.setValidators([Validators.required]);
      }
      capitalizationControl?.updateValueAndValidity();
    });

    // Subscribe to the value changes of the gracePeriod form control
    this.operationForm.get('gracePeriod')?.valueChanges.subscribe(value => {
      const gracePeriodNumberControl = this.operationForm.get('gracePeriodNumber');
      if (value === 'Sin P.G.') {
        // Disable the gracePeriodNumber form control if there is no grace period
        gracePeriodNumberControl?.disable();
        gracePeriodNumberControl?.clearValidators();
      } else {
        // Enable the gracePeriodNumber form control if there is a grace period
        gracePeriodNumberControl?.enable();
        gracePeriodNumberControl?.setValidators([Validators.required]);
      }
      gracePeriodNumberControl?.updateValueAndValidity();
    });
    if (typeof userId == 'string') {
      this.userService.getOne(parseInt(userId)).subscribe(user => {
        this.userTotalCredit = user.totalCredit;

        // Update the creditValue form control's validators after fetching the user data
        this.operationForm.get('creditValue')?.setValidators([Validators.required, this.creditValueValidator()]);
        this.operationForm.get('creditValue')?.updateValueAndValidity();
      });
    }
  }

  createForm() {
    this.operationForm = new FormGroup({
      currency: new FormControl('Soles', Validators.required),
      creditValue: new FormControl('', [Validators.required, this.creditValueValidator()]),
      numberOfInstallments: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
      initialFeePercentage: new FormControl('', [Validators.required, Validators.min(10), Validators.max(60)]),
      rateType: new FormControl('Nominal', Validators.required),
      capitalization: new FormControl('', Validators.required),
      rateTime: new FormControl('', Validators.required),
      rateValue: new FormControl('', [Validators.required, Validators.min(10), Validators.max(40)]),
      paymentFrequency: new FormControl('', Validators.required),
      gracePeriod: new FormControl('', Validators.required),
      gracePeriodNumber: new FormControl('', Validators.required)
    });
  }

  creditValueValidator(): ValidatorFn {
    const conversionFactor = 0.26;
    return (control: AbstractControl): {[key: string]: any} | null => {
      let creditValue = control.value;
      if (this.operationForm.get('currency')?.value === 'Dólares') {
        console.log('Dólares');
        if (control.value < 50*conversionFactor) {
          return {creditValueTooSmall: {value: control.value}};
        } else if (control.value > this.userTotalCredit*conversionFactor) {
          return {creditValueTooLarge: {value: control.value}};
        } else {
          return null;
        }
      } else {
        if (creditValue < 50) {
          return {creditValueTooSmall: {value: control.value}};
        } else if (control.value > this.userTotalCredit) {
          return {creditValueTooLarge: {value: control.value}};
        } else {
          return null;
        }
      }
    };
  }

  onSubmit() {
    console.log(this.operationForm.value);
    if (this.operationForm.valid) {
      const operation = new OperationModel(
        "",
        this.operationForm.value.currency,
        this.operationForm.value.creditValue,
        this.operationForm.value.numberOfInstallments,
        this.operationForm.value.initialFeePercentage,
        this.operationForm.value.rateType,
        this.operationForm.value.capitalization,
        this.operationForm.value.rateTime,
        this.operationForm.value.rateValue,
        this.operationForm.value.paymentFrequency,
        this.operationForm.value.gracePeriod,
        this.operationForm.value.gracePeriodNumber,
        this.route.snapshot.paramMap.get('id') || '',
        new Date().toISOString());

      this.operationService.post(operation).subscribe(
        response => {
          // Handle successful response
          console.log(response);

          this.userService.getOne(parseInt(this.route.snapshot.paramMap.get('id') || '')).subscribe(user => {
            // Subtract the creditValue from the user's totalCredit
            user.totalCredit -= this.operationForm.value.creditValue;

            // Update the user
            this.userService.update(user.id,user).subscribe(
              response => {
                // Handle successful response
                console.log(response);
              },
              error => {
                // Handle error response
                console.error(error);
              }
            );
          });
        },
        error => {
          // Handle error response
          console.error(error);
        }
      );
    }
  }
}
