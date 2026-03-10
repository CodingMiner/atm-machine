import { useATM } from "../hooks/useATM";
import { BalanceDisplay } from "./BalanceDisplay";
import { AmountDisplay } from "./AmountDisplay";
import { Numpad } from "./Numpad";
import { ActionButtons } from "./ActionButtons";
import { ErrorMessage } from "./ErrorMessage";

export const ATM = () => {
  const {
    balance,
    input,
    mode,
    error,
    confirmDisabled,
    handleDigit,
    handleClear,
    handleBackspace,
    handleModeSelect,
    handleConfirm,
  } = useATM();

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
};
