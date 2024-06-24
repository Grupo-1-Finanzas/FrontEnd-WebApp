export class OperationModel{
  id: string;
  currency: string;
  creditValue: number;
  numberOfInstallments: number;
  initialFeePercentage!: number;
  rateType: string;
  capitalization!: string;
  rateTime: string;
  rateValue: number;
  paymentFrequency: string;
  gracePeriod: string;
  gracePeriodNumber!: number;
  userId: string;
  date: string;

  constructor(id: string,
              currency: string,
              creditValue: number,
              numberOfInstallments: number,
              initialFeePercentage:number,
              rateType: string,
              capitalization: string,
              rateTime: string,
              rateValue: number,
              paymentFrequency: string,
              gracePeriod: string,
              gracePeriodNumber: number,
              userId: string,
              date: string){
    this.id = id;
    this.currency = currency;
    this.creditValue = creditValue;
    this.numberOfInstallments = numberOfInstallments;
    this.initialFeePercentage = initialFeePercentage;
    this.rateType = rateType;
    this.capitalization = capitalization;
    this.rateTime = rateTime;
    this.rateValue = rateValue;
    this.paymentFrequency = paymentFrequency;
    this.gracePeriod = gracePeriod;
    this.gracePeriodNumber = gracePeriodNumber;
    this.userId = userId;
    this.date = date;
  }
}
