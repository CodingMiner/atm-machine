export type TransactionMode = "deposit" | "withdraw";

const modeButtonActive: Record<TransactionMode, string> = {
  deposit: "bg-green-700 text-white",
  withdraw: "bg-red-800 text-white ",
};

const modeButtonInactive =
  "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white";

const confirmButtonActive: Record<TransactionMode, string> = {
  deposit: "bg-green-700 text-white hover:bg-green-600 cursor-pointer",
  withdraw: "bg-red-800 text-white hover:bg-red-700 cursor-pointer",
};

const confirmButtonDisabled = "bg-zinc-800 text-zinc-600 cursor-not-allowed";

interface ActionButtonsProps {
  mode: TransactionMode;
  onModeSelect: (mode: TransactionMode) => void;
  onConfirm: () => void;
  confirmDisabled: boolean;
}

export function ActionButtons({
  mode,
  onModeSelect,
  onConfirm,
  confirmDisabled,
}: ActionButtonsProps) {
  return (
    <div className="px-4 pb-4 flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <button
          data-testid="mode-deposit"
          onClick={() => onModeSelect("deposit")}
          className={`h-11 rounded-lg text-sm font-semibold uppercase tracking-wider cursor-pointer ${
            mode === "deposit" ? modeButtonActive.deposit : modeButtonInactive
          }`}
        >
          Deposit
        </button>
        <button
          data-testid="mode-withdraw"
          onClick={() => onModeSelect("withdraw")}
          className={`h-11 rounded-lg text-sm font-semibold uppercase tracking-wider cursor-pointer ${
            mode === "withdraw" ? modeButtonActive.withdraw : modeButtonInactive
          }`}
        >
          Withdraw
        </button>
      </div>

      <button
        data-testid="button-confirm"
        onClick={onConfirm}
        disabled={confirmDisabled}
        className={`h-12 rounded-lg font-semibold uppercase tracking-wider ${
          confirmDisabled ? confirmButtonDisabled : confirmButtonActive[mode]
        }`}
      >
        Confirm {mode === "deposit" ? "Deposit" : "Withdrawal"}
      </button>
    </div>
  );
}
