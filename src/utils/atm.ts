import type { TransactionMode } from "../components/ActionButtons";

export const MAX_INPUT_DIGITS = 6;
export const INITIAL_BALANCE = 1000;

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

export const inputToDisplay = (input: string): string =>
  input === "" ? formatCurrency(0) : formatCurrency(Number(input));

export const inputToAmount = (input: string): number =>
  input === "" ? 0 : Number(input);

export const appendDigit = (input: string, digit: string): string => {
  if (input.length >= MAX_INPUT_DIGITS) return input;
  if (input === "" && digit === "0") return input;
  return input + digit;
};

export const removeLastDigit = (input: string): string => input.slice(0, -1);

export const deposit = (balance: number, amount: number): number =>
  balance + amount;

export const withdraw = (balance: number, amount: number): number =>
  balance - amount;

export const validateAmount = (
  input: string,
  mode: TransactionMode,
  balance: number
): string => {
  const amount = inputToAmount(input);
  if (mode === "withdraw" && amount > balance) return "Insufficient funds";
  return "";
};
