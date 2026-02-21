import type { TransactionMode } from "../components/ActionButtons";

export const MAX_INPUT_DIGITS = 6;
export const INITIAL_BALANCE = 1000;

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function inputToDisplay(input: string): string {
  if (input === "") return formatCurrency(0);
  return formatCurrency(Number(input));
}

export function inputToAmount(input: string): number {
  if (input === "") return 0;
  return Number(input);
}

export function appendDigit(input: string, digit: string): string {
  if (input.length >= MAX_INPUT_DIGITS) return input;
  if (input === "" && digit === "0") return input;
  return input + digit;
}

export function removeLastDigit(input: string): string {
  return input.slice(0, -1);
}

export function deposit(balance: number, amount: number): number {
  return balance + amount;
}

export function withdraw(balance: number, amount: number): number {
  return balance - amount;
}

export function validateAmount(
  input: string,
  mode: TransactionMode,
  balance: number
): string {
  const amount = inputToAmount(input);
  if (mode === "withdraw" && amount > balance) return "Insufficient funds";
  return "";
}
