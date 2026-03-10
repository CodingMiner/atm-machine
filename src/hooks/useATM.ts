import { useState, useEffect } from "react";
import {
  INITIAL_BALANCE,
  appendDigit,
  removeLastDigit,
  deposit,
  withdraw,
  validateAmount,
} from "../utils/atm";
import type { TransactionMode } from "../components/ActionButtons";

export const useATM = () => {
  const [balance, setBalance] = useState(() => {
    const parsed = parseInt(localStorage.getItem("atm-balance") ?? "", 10);
    return isNaN(parsed) ? INITIAL_BALANCE : parsed;
  });
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<TransactionMode>("deposit");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("atm-balance", String(balance));
  }, [balance]);

  const handleDigit = (digit: string) => {
    setError("");
    setInput((prev) => appendDigit(prev, digit));
  };

  const handleClear = () => {
    setError("");
    setInput("");
  };

  const handleBackspace = () => {
    setError("");
    setInput((prev) => removeLastDigit(prev));
  };

  const handleModeSelect = (newMode: TransactionMode) => {
    setError("");
    setMode(newMode);
  };

  const handleConfirm = () => {
    const validationError = validateAmount(input, mode, balance);
    if (validationError) {
      setError(validationError);
      return;
    }

    const amount = Number(input);

    if (mode === "deposit") {
      setBalance(deposit(balance, amount));
    } else {
      setBalance(withdraw(balance, amount));
    }

    setInput("");
  };

  return {
    balance,
    input,
    mode,
    error,
    confirmDisabled: input === "",
    handleDigit,
    handleClear,
    handleBackspace,
    handleModeSelect,
    handleConfirm,
  };
};
