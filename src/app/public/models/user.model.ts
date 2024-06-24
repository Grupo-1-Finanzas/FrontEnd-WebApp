export class UserModel {
  id!: string;
  dni: string;
  email: string;
  password: string;
  name: string;
  birth: string;
  user: string;
  totalCredit: number;

  constructor(dni: string,name: string,birth: string ,email: string,user: string, password: string , totalCredit: number = 300) {
    this.dni = dni;
    this.email = email;
    this.password = password;
    this.name = name;
    this.birth = birth;
    this.user = user;
    this.totalCredit = totalCredit;
  }

  //solicita un monto de dinero que redurcirá el total de crédito del usuario
  requestCredit(amount: number): boolean {
    if (this.totalCredit >= amount) {
      this.totalCredit -= amount;
      return true;
    }
    return false;
  }

  //devuelve un monto de dinero que aumentará el total de crédito del usuario
  returnCredit(amount: number): void {
    this.totalCredit += amount;
  }
}
