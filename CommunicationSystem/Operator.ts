// Operator.ts

import { Customer } from "./Customer";

export class Operator {
  private ID: number;
  private talkingCharge: number;
  private messageCost: number;
  private networkCharge: number;
  private discountRate: number;

  private totalSpentTalkingTime: number;
  private totalSentMessages: number;
  private totalInternetUsage: number;

  constructor(ID: number, talkingCharge: number, messageCost: number, networkCharge: number, discountRate: number) {
    this.ID = ID;
    this.setTalkingCharge(talkingCharge);
    this.setMessageCost(messageCost);
    this.setNetworkCharge(networkCharge);
    this.setDiscountRate(discountRate);

    this.totalSpentTalkingTime = 0;
    this.totalSentMessages = 0;
    this.totalInternetUsage = 0.0;
  }

  // Calculate talking cost
  public calculateTalkingCost(minute: number, customer: Customer): number {
    let cost = minute * this.talkingCharge;

    if (customer.getAge() < 18 || customer.getAge() > 65) {
      cost *= (100 - this.discountRate) / 100.0;
    }

    return cost;
  }

  // Calculate message cost
  public calculateMessageCost(quantity: number, customer: Customer, other: Customer): number {
    let cost = quantity * this.messageCost;

    if (customer.getOperator().getID() === other.getOperator().getID()) {
      cost *= (100 - this.discountRate) / 100.0;
    }

    return cost;
  }

  // Calculate internet cost
  public calculateNetworkCost(amount: number): number {
    return amount * this.networkCharge;
  }

  // Getters and setters
  public getTalkingCharge(): number {
    return this.talkingCharge;
  }

  public setTalkingCharge(talkingCharge: number): void {
    try {
      if (talkingCharge < 0.0) throw new Error("Talking charge must be non-negative.");
      this.talkingCharge = talkingCharge;
    } catch (e: any) {
      console.log(e.message);
    }
  }

  public getMessageCost(): number {
    return this.messageCost;
  }

  public setMessageCost(messageCost: number): void {
    try {
      if (messageCost < 0.0) throw new Error("Message cost must be non-negative.");
      this.messageCost = messageCost;
    } catch (e: any) {
      console.log(e.message);
    }
  }

  public getNetworkCharge(): number {
    return this.networkCharge;
  }

  public setNetworkCharge(networkCharge: number): void {
    try {
      if (networkCharge < 0.0) throw new Error("Network charge must be non-negative.");
      this.networkCharge = networkCharge;
    } catch (e: any) {
      console.log(e.message);
    }
  }

  public getDiscountRate(): number {
    return this.discountRate;
  }

  public setDiscountRate(discountRate: number): void {
    try {
      if (discountRate < 0 || discountRate > 100) throw new Error("Discount rate must be between 0-100.");
      this.discountRate = discountRate;
    } catch (e: any) {
      console.log(e.message);
    }
  }

  // Extra methods
  public getID(): number {
    return this.ID;
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

  public addTalkingTime(minute: number): void {
    const newTotal = this.totalSpentTalkingTime + minute;
    if (newTotal >= 0) this.totalSpentTalkingTime = newTotal;
  }

  public addSentMessages(quantity: number): void {
    const newTotal = this.totalSentMessages + quantity;
    if (newTotal >= 0) this.totalSentMessages = newTotal;
  }

  public addInternetUsage(amount: number): void {
    const newTotal = this.totalInternetUsage + amount;
    if (newTotal >= 0.0) this.totalInternetUsage = newTotal;
  }

  public toString(): string {
    return `Operator ${this.ID} : ${this.totalSpentTalkingTime} ${this.totalSentMessages} ${this.totalInternetUsage.toFixed(2)}`;
  }
}
