import { useState, useEffect } from "react";
import {
  INITIAL_BALANCE,
  appendDigit,
  removeLastDigit,
  deposit,
  withdraw,
  validateAmount,
} from "../utils/atm";
import { BalanceDisplay } from "./BalanceDisplay";
import { AmountDisplay } from "./AmountDisplay";
import { Numpad } from "./Numpad";
import { ActionButtons, type TransactionMode } from "./ActionButtons";
import { ErrorMessage } from "./ErrorMessage";

export function ATM() {
  const [balance, setBalance] = useState(() => {
    const parsed = parseInt(localStorage.getItem("atm-balance") ?? "", 10);
    return isNaN(parsed) ? INITIAL_BALANCE : parsed;
  });
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<TransactionMode>("deposit");
  const [error, setError] = useState("");

  const confirmDisabled = input === "";

  useEffect(() => {
    localStorage.setItem("atm-balance", String(balance));
  }, [balance]);

  function handleDigit(digit: string) {
    setError("");
    setInput((prev) => appendDigit(prev, digit));
  }

  function handleClear() {
    setError("");
    setInput("");
  }

  function handleBackspace() {
    setError("");
    setInput((prev) => removeLastDigit(prev));
  }

  function handleModeSelect(newMode: TransactionMode) {
    setError("");
    setMode(newMode);
  }

  function handleConfirm() {
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
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl">
      <div className="m-4 rounded-xl border border-zinc-700 bg-black">
        <BalanceDisplay balance={balance} />
        <AmountDisplay input={input} />
      </div>
      <ErrorMessage message={error} />
      <Numpad
        onDigit={handleDigit}
        onClear={handleClear}
        onBackspace={handleBackspace}
      />
      <ActionButtons
        mode={mode}
        onModeSelect={handleModeSelect}
        onConfirm={handleConfirm}
        confirmDisabled={confirmDisabled}
      />
    </div>
  );
}
