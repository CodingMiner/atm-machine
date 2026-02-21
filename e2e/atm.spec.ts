import { test, expect } from "@playwright/test";
import { ATMPage } from "./helpers";

test.describe("ATM Machine", () => {
  let atm: ATMPage;

  test.beforeEach(async ({ page }) => {
    atm = new ATMPage(page);
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("atm-balance"));
    await page.reload();
  });

  test.describe("Initial State", () => {
    test("balance shows $1,000", async () => {
      await expect(atm.balanceDisplay).toHaveText("$1,000");
    });

    test("amount display shows $0", async () => {
      await expect(atm.amountDisplay).toHaveText("$0");
    });

    test("confirm button text is Confirm Deposit", async () => {
      await expect(atm.confirmButton).toHaveText("Confirm Deposit");
    });

    test("confirm button is disabled", async () => {
      await expect(atm.confirmButton).toBeDisabled();
    });

    test("error message is not attached to DOM", async () => {
      await expect(atm.errorMessage).not.toBeAttached();
    });
  });

  test.describe("Numpad Input", () => {
    test("single digit updates amount display", async () => {
      await atm.digit("5").click();
      await expect(atm.amountDisplay).toHaveText("$5");
    });

    test("multiple digits build up amount", async () => {
      await atm.enterAmount("250");
      await expect(atm.amountDisplay).toHaveText("$250");
    });

    test("leading zero does not change display", async () => {
      await atm.digit("0").click();
      await expect(atm.amountDisplay).toHaveText("$0");
    });

    test("0 after non-zero digit appends correctly", async () => {
      await atm.digit("5").click();
      await atm.digit("0").click();
      await expect(atm.amountDisplay).toHaveText("$50");
    });

    test("input capped at 6 digits", async () => {
      await atm.enterAmount("1234567");
      await expect(atm.amountDisplay).toHaveText("$123,456");
    });

    test("confirm button becomes enabled after first digit", async () => {
      await atm.digit("1").click();
      await expect(atm.confirmButton).toBeEnabled();
    });

    test("large amount formats with comma separator", async () => {
      await atm.enterAmount("1500");
      await expect(atm.amountDisplay).toHaveText("$1,500");
    });
  });

  test.describe("Backspace and Clear", () => {
    test("backspace removes last digit", async () => {
      await atm.enterAmount("123");
      await atm.backspaceButton.click();
      await expect(atm.amountDisplay).toHaveText("$12");
    });

    test("backspace on single digit resets to $0", async () => {
      await atm.digit("5").click();
      await atm.backspaceButton.click();
      await expect(atm.amountDisplay).toHaveText("$0");
    });

    test("backspace on empty input does nothing", async () => {
      await atm.backspaceButton.click();
      await expect(atm.amountDisplay).toHaveText("$0");
    });

    test("clear resets amount to $0", async () => {
      await atm.enterAmount("500");
      await atm.clearButton.click();
      await expect(atm.amountDisplay).toHaveText("$0");
    });

    test("clear disables confirm button", async () => {
      await atm.enterAmount("500");
      await atm.clearButton.click();
      await expect(atm.confirmButton).toBeDisabled();
    });

    test("backspace dismisses an existing error", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("5000");
      await atm.confirmButton.click();
      await expect(atm.errorMessage).toBeAttached();
      await atm.backspaceButton.click();
      await expect(atm.errorMessage).not.toBeAttached();
    });

    test("clear dismisses an existing error", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("5000");
      await atm.confirmButton.click();
      await expect(atm.errorMessage).toBeAttached();
      await atm.clearButton.click();
      await expect(atm.errorMessage).not.toBeAttached();
    });
  });

  test.describe("Mode Switching", () => {
    test("switching to withdraw changes confirm text", async () => {
      await atm.withdrawModeButton.click();
      await expect(atm.confirmButton).toHaveText("Confirm Withdrawal");
    });

    test("switching back to deposit changes confirm text", async () => {
      await atm.withdrawModeButton.click();
      await atm.depositModeButton.click();
      await expect(atm.confirmButton).toHaveText("Confirm Deposit");
    });

    test("switching mode dismisses an existing error", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("5000");
      await atm.confirmButton.click();
      await expect(atm.errorMessage).toBeAttached();
      await atm.depositModeButton.click();
      await expect(atm.errorMessage).not.toBeAttached();
    });

    test("mode switch does not reset the entered amount", async () => {
      await atm.enterAmount("250");
      await atm.withdrawModeButton.click();
      await expect(atm.amountDisplay).toHaveText("$250");
    });
  });

  test.describe("Deposit — Happy Path", () => {
    test("depositing $500 increases balance to $1,500", async () => {
      await atm.enterAmount("500");
      await atm.confirmButton.click();
      await expect(atm.balanceDisplay).toHaveText("$1,500");
    });

    test("amount display resets to $0 after successful deposit", async () => {
      await atm.enterAmount("500");
      await atm.confirmButton.click();
      await expect(atm.amountDisplay).toHaveText("$0");
    });

    test("confirm button becomes disabled again after deposit", async () => {
      await atm.enterAmount("500");
      await atm.confirmButton.click();
      await expect(atm.confirmButton).toBeDisabled();
    });

    test("no error shown after successful deposit", async () => {
      await atm.enterAmount("500");
      await atm.confirmButton.click();
      await expect(atm.errorMessage).not.toBeAttached();
    });

    test("multiple consecutive deposits accumulate", async () => {
      await atm.enterAmount("200");
      await atm.confirmButton.click();
      await atm.enterAmount("300");
      await atm.confirmButton.click();
      await expect(atm.balanceDisplay).toHaveText("$1,500");
    });
  });

  test.describe("Withdraw — Happy Path", () => {
    test("withdrawing $200 decreases balance to $800", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("200");
      await atm.confirmButton.click();
      await expect(atm.balanceDisplay).toHaveText("$800");
    });

    test("amount display resets to $0 after successful withdrawal", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("200");
      await atm.confirmButton.click();
      await expect(atm.amountDisplay).toHaveText("$0");
    });

    test("withdrawing exact balance reduces to $0", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("1000");
      await atm.confirmButton.click();
      await expect(atm.balanceDisplay).toHaveText("$0");
    });

    test("multiple consecutive withdrawals accumulate correctly", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("300");
      await atm.confirmButton.click();
      await atm.enterAmount("200");
      await atm.confirmButton.click();
      await expect(atm.balanceDisplay).toHaveText("$500");
    });
  });

  test.describe("Error States", () => {
    test("confirm button is disabled with empty input", async () => {
      await expect(atm.confirmButton).toBeDisabled();
    });

    test("withdrawing more than balance shows error", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("5000");
      await atm.confirmButton.click();
      await expect(atm.errorMessage).toContainText("Insufficient funds");
    });

    test("failed withdrawal does not change the balance", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("5000");
      await atm.confirmButton.click();
      await expect(atm.balanceDisplay).toHaveText("$1,000");
    });

    test("failed withdrawal does not clear the input", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("5000");
      await atm.confirmButton.click();
      await expect(atm.amountDisplay).toHaveText("$5,000");
    });

    test("entering a new digit after an error dismisses the error", async () => {
      await atm.withdrawModeButton.click();
      await atm.enterAmount("5000");
      await atm.confirmButton.click();
      await expect(atm.errorMessage).toBeAttached();
      await atm.digit("1").click();
      await expect(atm.errorMessage).not.toBeAttached();
    });
  });
});
