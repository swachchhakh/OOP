// Main.ts
import * as fs from "fs";

class Bill {
  private limit: number;
  private debt: number = 0;
  private paid: number = 0;

  constructor(limit: number) {
    this.limit = limit;
  }

  add(amount: number): boolean {
    if (this.debt + amount > this.limit) return false;
    this.debt += amount;
    return true;
  }

  pay(amount: number): void {
    const applied = Math.min(amount, this.debt);
    this.debt -= applied;
    this.paid += applied;
  }

  changeLimit(newLimit: number): void {
    this.limit = newLimit;
  }

  getDebt(): number {
    return this.debt;
  }

  getPaid(): number {
    return this.paid;
  }
}

class Operator {
  id: number;
  talkingCharge: number;
  messageCost: number;
  networkCharge: number;
  discountRate: number;

  totalTalk: number = 0;
  totalMessages: number = 0;
  totalInternet: number = 0;

  constructor(
    id: number,
    talkingCharge: number,
    messageCost: number,
    networkCharge: number,
    discountRate: number
  ) {
    this.id = id;
    this.talkingCharge = talkingCharge;
    this.messageCost = messageCost;
    this.networkCharge = networkCharge;
    this.discountRate = discountRate;
  }

  toString(): string {
    return `Operator ${this.id} : ${this.totalTalk} ${this.totalMessages} ${this.totalInternet.toFixed(
      2
    )}`;
  }
}

class Customer {
  id: number;
  name: string;
  age: number;
  operator: Operator;
  bill: Bill;

  totalTalk: number = 0;
  totalMessages: number = 0;
  totalInternet: number = 0;

  constructor(
    id: number,
    name: string,
    age: number,
    operator: Operator,
    limit: number
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.operator = operator;
    this.bill = new Bill(limit);
  }

  talk(minutes: number, other: Customer): void {
    let cost = minutes * this.operator.talkingCharge;
    if (this.age < 18 || other.age < 18) {
      cost *= 1 - this.operator.discountRate / 100.0;
    }
    if (this.bill.add(cost)) {
      this.totalTalk += minutes;
      this.operator.totalTalk += minutes;
    }
  }

  message(count: number, other: Customer): void {
    let cost = count * this.operator.messageCost;
    if (this.operator.id === other.operator.id) {
      cost *= 1 - this.operator.discountRate / 100.0;
    }
    if (this.bill.add(cost)) {
      this.totalMessages += count;
      this.operator.totalMessages += count;
    }
  }

  connection(mb: number): void {
    const cost = mb * this.operator.networkCharge;
    if (this.bill.add(cost)) {
      this.totalInternet += mb;
      this.operator.totalInternet += mb;
    }
  }

  setOperator(newOp: Operator): void {
    this.operator = newOp;
  }

  getBill(): Bill {
    return this.bill;
  }

  getTotalSpentTalkingTime(): number {
    return this.totalTalk;
  }

  getTotalSentMessages(): number {
    return this.totalMessages;
  }

  getTotalInternetUsage(): number {
    return this.totalInternet;
  }

  toString(): string {
    return `Customer ${this.id} : ${this.bill.getPaid().toFixed(
      2
    )} ${this.bill.getDebt().toFixed(2)}`;
  }
}

// === MAIN ===
function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: ts-node Main.ts <inputFile> <outputFile>");
    process.exit(1);
  }

  const [inputFile, outputFile] = args;
  const input = fs.readFileSync(inputFile, "utf-8").trim().split(/\s+/);

  let idx = 0;
  const C = parseInt(input[idx++]);
  const O = parseInt(input[idx++]);
  const N = parseInt(input[idx++]);

  const customers: Customer[] = new Array(C);
  const operators: Operator[] = new Array(O);

  let custCnt = 0,
    operCnt = 0;

  for (let lineNo = 1; lineNo <= N; lineNo++) {
    const opType = parseInt(input[idx++]);
    switch (opType) {
      case 1: {
        const name = input[idx++];
        const age = parseInt(input[idx++]);
        const operId = parseInt(input[idx++]);
        const limit = parseFloat(input[idx++]);
        customers[custCnt] = new Customer(
          custCnt,
          name,
          age,
          operators[operId],
          limit
        );
        custCnt++;
        break;
      }
      case 2: {
        const talking = parseFloat(input[idx++]);
        const msg = parseFloat(input[idx++]);
        const net = parseFloat(input[idx++]);
        const disc = parseInt(input[idx++]);
        operators[operCnt] = new Operator(operCnt, talking, msg, net, disc);
        operCnt++;
        break;
      }
      case 3: {
        const c1 = parseInt(input[idx++]);
        const c2 = parseInt(input[idx++]);
        const time = parseInt(input[idx++]);
        customers[c1].talk(time, customers[c2]);
        break;
      }
      case 4: {
        const c1 = parseInt(input[idx++]);
        const c2 = parseInt(input[idx++]);
        const count = parseInt(input[idx++]);
        customers[c1].message(count, customers[c2]);
        break;
      }
      case 5: {
        const cId = parseInt(input[idx++]);
        const amount = parseFloat(input[idx++]);
        customers[cId].connection(amount);
        break;
      }
      case 6: {
        const cId = parseInt(input[idx++]);
        const amount = parseFloat(input[idx++]);
        customers[cId].getBill().pay(amount);
        break;
      }
      case 7: {
        const cId = parseInt(input[idx++]);
        const opId = parseInt(input[idx++]);
        customers[cId].setOperator(operators[opId]);
        break;
      }
      case 8: {
        const cId = parseInt(input[idx++]);
        const limit = parseFloat(input[idx++]);
        customers[cId].getBill().changeLimit(limit);
        break;
      }
      default:
        throw new Error(`Invalid operation at line ${lineNo}`);
    }
  }

  const out: string[] = [];
  operators.forEach((op) => out.push(op.toString()));

  let mostTalk = customers[0];
  let mostMsg = customers[0];
  let mostNet = customers[0];

  customers.forEach((c) => {
    if (c.getTotalSpentTalkingTime() > mostTalk.getTotalSpentTalkingTime())
      mostTalk = c;
    if (c.getTotalSentMessages() > mostMsg.getTotalSentMessages())
      mostMsg = c;
    if (c.getTotalInternetUsage() > mostNet.getTotalInternetUsage())
      mostNet = c;
    out.push(c.toString());
  });

  out.push(`${mostTalk.name} : ${mostTalk.getTotalSpentTalkingTime()}`);
  out.push(`${mostMsg.name} : ${mostMsg.getTotalSentMessages()}`);
  out.push(`${mostNet.name} : ${mostNet.getTotalInternetUsage().toFixed(2)}`);

  fs.writeFileSync(outputFile, out.join("\n"));
}

main();
