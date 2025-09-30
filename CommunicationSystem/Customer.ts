// Customer.ts

import { Operator } from "./Operator";
import { Bill } from "./Bill";

export class Customer {
  private ID: number;
  private name: string;
  private age: number;
  private operator: Operator;
  private bill: Bill;

  // Extra fields
  private totalSpentTalkingTime: number;
  private totalSentMessages: number;
  private totalInternetUsage: number;

  constructor(ID: number, name: string, age: number, operator: Operator, limitingAmount: number) {
    this.ID = ID;
    this.name = name;
    this.setAge(age);
    this.operator = operator;
    this.bill = new Bill(limitingAmount);

    this.totalSpentTalkingTime = 0;
    this.totalSentMessages = 0;
    this.totalInternetUsage = 0.0;
  }

  // Customers talk
  public talk(minute: number, other: Customer): void {
    try {
      if (minute < 0) throw new Error("Duration of the call must be non-negative.");

      if (this.ID !== other.ID) {
        const cost = this.operator.calculateTalkingCost(minute, this);

        if (this.bill.check(cost)) {
          this.bill.add(cost);
          this.operator.addTalkingTime(minute);
          other.operator.addTalkingTime(minute);
          this.totalSpentTalkingTime += minute;
          other.totalSpentTalkingTime += minute;
        }
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  // Customers send messages
  public message(quantity: number, other: Customer): void {
    try {
      if (quantity < 0) throw new Error("Number of messages to be sent must be non-negative.");

      if (this.ID !== other.ID) {
        const cost = this.operator.calculateMessageCost(quantity, this, other);

        if (this.bill.check(cost)) {
          this.bill.add(cost);
          this.operator.addSentMessages(quantity);
          this.totalSentMessages += quantity;
        }
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  // Customers use Internet
  public connection(amount: number): void {
    try {
      if (amount < 0.0) throw new Error("Number of data must be non-negative.");

      const cost = this.operator.calculateNetworkCost(amount);

      if (this.bill.check(cost)) {
        this.bill.add(cost);
        this.operator.addInternetUsage(amount);
        this.totalInternetUsage += amount;
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  // Getter and Setter for age
  public getAge(): number {
    return this.age;
  }

  public setAge(age: number): void {
    try {
      if (age < 0) throw new Error("Age must be non-negative.");
      this.age = age;
    } catch (e: any) {
      console.log(e.message);
    }
  }

  // Getter and Setter for operator
  public getOperator(): Operator {
    return this.operator;
  }

  public setOperator(operator: Operator): void {
    this.operator = operator;
  }

  // Getter and Setter for bill
  public getBill(): Bill {
    return this.bill;
  }

  public setBill(bill: Bill): void {
    this.bill = bill;
  }

  // Extra Getters
  public getID(): number {
    return this.ID;
  }

  public getName(): string {
    return this.name;
  }

  public getTotalSpentTalkingTime(): number {
    return this.totalSpentTalkingTime;
  }

  public getTotalSentMessages(): number {
    return this.totalSentMessages;
  }

  public getTotalInternetUsage(): number {
    return this.totalInternetUsage;
  }

  // toString equivalent
  public toString(): string {
    return `Customer ${this.ID} : ${this.bill.getTotalMoneySpent().toFixed(2)} ${this.bill.getCurrentDebt().toFixed(2)}`;
  }
}
