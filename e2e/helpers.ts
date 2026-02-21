import { type Page, type Locator } from "@playwright/test";

export class ATMPage {
  readonly page: Page;
  readonly balanceDisplay: Locator;
  readonly amountDisplay: Locator;
  readonly errorMessage: Locator;
  readonly confirmButton: Locator;
  readonly clearButton: Locator;
  readonly backspaceButton: Locator;
  readonly depositModeButton: Locator;
  readonly withdrawModeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.balanceDisplay = page.getByTestId("balance-display");
    this.amountDisplay = page.getByTestId("amount-display");
    this.errorMessage = page.getByTestId("error-message");
    this.confirmButton = page.getByTestId("button-confirm");
    this.clearButton = page.getByTestId("button-clear");
    this.backspaceButton = page.getByTestId("button-backspace");
    this.depositModeButton = page.getByTestId("mode-deposit");
    this.withdrawModeButton = page.getByTestId("mode-withdraw");
  }

  digit(d: string): Locator {
    return this.page.getByTestId(`digit-${d}`);
  }

  async enterAmount(amount: string): Promise<void> {
    for (const digit of amount) {
      await this.digit(digit).click();
    }
  }
}
