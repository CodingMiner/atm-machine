import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  inputToDisplay,
  inputToAmount,
  appendDigit,
  removeLastDigit,
  deposit,
  withdraw,
  validateAmount,
  MAX_INPUT_DIGITS,
} from "./atm";

describe("formatCurrency", () => {
  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  it("formats a single digit amount", () => {
    expect(formatCurrency(5)).toBe("$5");
  });

  it("formats a whole dollar amount with comma separator", () => {
    expect(formatCurrency(1500)).toBe("$1,500");
  });

  it("formats a large amount", () => {
    expect(formatCurrency(999999)).toBe("$999,999");
  });
});

describe("inputToDisplay", () => {
  it("returns $0 for empty string", () => {
    expect(inputToDisplay("")).toBe("$0");
  });

  it('formats "1500" as $1,500', () => {
    expect(inputToDisplay("1500")).toBe("$1,500");
  });

  it('formats "1" as $1', () => {
    expect(inputToDisplay("1")).toBe("$1");
  });
});

describe("inputToAmount", () => {
  it("converts a digit string to a number", () => {
    expect(inputToAmount("1500")).toBe(1500);
  });

  it("returns 0 for empty string", () => {
    expect(inputToAmount("")).toBe(0);
  });

  it("converts single digit", () => {
    expect(inputToAmount("7")).toBe(7);
  });
});

describe("appendDigit", () => {
  it("appends a digit to an empty string", () => {
    expect(appendDigit("", "5")).toBe("5");
  });

  it("appends a digit to an existing string", () => {
    expect(appendDigit("15", "0")).toBe("150");
  });

  it("does not exceed MAX_INPUT_DIGITS", () => {
    const maxInput = "1".repeat(MAX_INPUT_DIGITS);
    expect(appendDigit(maxInput, "9")).toBe(maxInput);
  });

  it("does not allow a leading zero", () => {
    expect(appendDigit("", "0")).toBe("");
  });

  it("allows zero after a non-zero digit", () => {
    expect(appendDigit("5", "0")).toBe("50");
  });
});

describe("removeLastDigit", () => {
  it("removes the last digit from a multi-char string", () => {
    expect(removeLastDigit("150")).toBe("15");
  });

  it("returns empty string when input has one character", () => {
    expect(removeLastDigit("5")).toBe("");
  });

  it("no operation on empty string", () => {
    expect(removeLastDigit("")).toBe("");
  });
});

describe("deposit", () => {
  it("adds the amount to the balance", () => {
    expect(deposit(1000, 500)).toBe(1500);
  });

  it("adding zero returns the same balance", () => {
    expect(deposit(1000, 0)).toBe(1000);
  });
});

describe("withdraw", () => {
  it("subtracts the amount from the balance", () => {
    expect(withdraw(1000, 200)).toBe(800);
  });

  it("succeeds when withdrawing the exact balance", () => {
    expect(withdraw(1000, 1000)).toBe(0);
  });
});

describe("validateAmount", () => {
  it("returns an error for a withdrawal exceeding balance", () => {
    expect(validateAmount("500", "withdraw", 200)).toBe("Insufficient funds.");
  });

  it("returns empty string for a valid deposit", () => {
    expect(validateAmount("100", "deposit", 0)).toBe("");
  });

  it("returns empty string for a valid withdrawal within balance", () => {
    expect(validateAmount("100", "withdraw", 500)).toBe("");
  });

  it("returns empty string when withdrawing the exact balance", () => {
    expect(validateAmount("1000", "withdraw", 1000)).toBe("");
  });
});
