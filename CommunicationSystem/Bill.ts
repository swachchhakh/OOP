// Bill.ts

export class Bill {
    /**
     * Limiting amount of the bill.
     * If a customer would exceed the limit after the actions, then no actions occur.
     */
    private limitingAmount: number;
  
    /**
     * Current debt of the bill.
     */
    private currentDebt: number;
  
    // *** Extra Fields ***
  
    /**
     * Total amount of money the customer has spent for paying their bills over the course of simulation.
     */
    private totalMoneySpent: number;
  
    /**
     * Constructor with 1 parameter.
     * Throws an error if the given limiting amount is negative.
     * @param limitingAmount Limiting amount of the bill.
     */
    constructor(limitingAmount: number) {
      if (limitingAmount < 0.0) {
        throw new Error("Limiting amount must be non-negative.");
      }
  
      this.limitingAmount = limitingAmount;
      this.currentDebt = 0.0;
      this.totalMoneySpent = 0.0;
    }
  
    /**
     * Checks whether the limitingAmount is exceeded or not when a certain amount is about to be added to bill's current debt.
     * @param amount Amount to check.
     * @return TRUE if the limitingAmount is not exceeded, FALSE otherwise.
     */
    public check(amount: number): boolean {
      return this.currentDebt + amount <= this.limitingAmount;
    }
  
    /**
     * Adds debt to the bill.
     * This method has to be called with the "check" method.
     * @param amount Amount to be added to the current debt.
     */
    public add(amount: number): void {
      this.currentDebt += amount;
    }
  
    /**
     * Pays the bills with the given amount.
     * If someone tries to pay more than their debt, then they must pay only the current debt.
     * @param amount Amount to be paid from the current debt.
     */
    public pay(amount: number): void {
      if (amount < this.currentDebt) {
        this.currentDebt -= amount;
        this.totalMoneySpent += amount;
      } else {
        this.totalMoneySpent += this.currentDebt;
        this.currentDebt = 0.0; // There is no negative debt.
      }
    }
  
    /**
     * Changes the limitingAmount.
     * If the current debt would exceed the new limit, then the limit remains unchanged.
     * @param amount New limiting amount of the bill.
     */
    public changeTheLimit(amount: number): void {
      if (amount >= this.currentDebt) {
        this.limitingAmount = amount;
      }
    }
  
    /**
     * Getter method for limitingAmount.
     * @return Limiting amount of the bill.
     */
    public getLimitingAmount(): number {
      return this.limitingAmount;
    }
  
    /**
     * Getter method for currentDebt.
     * @return Current debt of the bill.
     */
    public getCurrentDebt(): number {
      return this.currentDebt;
    }
  
    // *** Extra Methods ***
  
    /**
     * Getter method for totalMoneySpent.
     * @return Total amount of money the customer has spent for paying their bills over the course of simulation.
     */
    public getTotalMoneySpent(): number {
      return this.totalMoneySpent;
    }
  }
  