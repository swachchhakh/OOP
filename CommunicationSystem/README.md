# Communication System Simulation (TypeScript)

## Overview

This project simulates a **mobile communication system** using **Object-Oriented Programming (OOP)** concepts. It models **Customers**, **Operators**, and **Bills**, allowing customers to:

- Talk to each other
- Send messages
- Connect to the Internet
- Manage their bills and limits
- Change their operators

The simulation processes input from a file, performs operations, and writes the results to an output file. It demonstrates **encapsulation, polymorphism, and method interaction between classes**.

---

## Classes

### `Customer`

Represents a customer using the communication system.

**Fields:**
- `ID` – Unique customer ID
- `name` – Customer's name
- `age` – Customer's age
- `operator` – Current operator
- `bill` – Customer’s bill
- `totalSpentTalkingTime` – Minutes spent talking
- `totalSentMessages` – Total messages sent
- `totalInternetUsage` – Total internet usage in MB

**Methods:**
- `talk(minute: number, other: Customer)` – Talk to another customer
- `message(quantity: number, other: Customer)` – Send messages
- `connection(amount: number)` – Connect to internet
- `getBill()` – Returns the customer’s bill
- `setOperator(operator: Operator)` – Change operator
- `getTotalSpentTalkingTime()`, `getTotalSentMessages()`, `getTotalInternetUsage()` – Activity getters
- `toString()` – Returns a summary string of total money spent and debt

---

### `Operator`

Represents a telecom operator.

**Fields:**
- `ID` – Operator ID
- `talkingCharge` – Cost per minute
- `messageCost` – Cost per message
- `networkCharge` – Cost per MB
- `discountRate` – Discount percentage
- `totalSpentTalkingTime` – Minutes served
- `totalSentMessages` – Messages sent
- `totalInternetUsage` – MB served

**Methods:**
- `calculateTalkingCost(minute: number, customer: Customer)` – Returns talking cost
- `calculateMessageCost(quantity: number, customer: Customer, other: Customer)` – Returns messaging cost
- `calculateNetworkCost(amount: number)` – Returns internet cost
- `addTalkingTime(minute: number)`, `addSentMessages(quantity: number)`, `addInternetUsage(amount: number)` – Track operator usage
- `toString()` – Summary of operator activity

---

### `Bill`

Represents a customer’s bill.

**Fields:**
- `limitingAmount` – Maximum allowable debt
- `currentDebt` – Current debt
- `totalMoneySpent` – Total money spent over the simulation

**Methods:**
- `check(amount: number)` – Checks if adding a cost exceeds limit
- `add(amount: number)` – Adds cost to debt
- `pay(amount: number)` – Pay part or full debt
- `changeTheLimit(amount: number)` – Change bill limit safely
- `getTotalMoneySpent()`, `getCurrentDebt()` – Accessors

---

## Simulation Logic

1. **Input File**: The first line contains:
