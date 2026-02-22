import { formatCurrency } from "../utils/atm";

interface BalanceDisplayProps {
  balance: number;
}

export const BalanceDisplay = ({ balance }: BalanceDisplayProps) => {
  return (
    <div className="px-4 py-3 border-b border-zinc-700">
      <p className="text-xs uppercase tracking-widest text-zinc-300 mb-1">
        Account Balance
      </p>
      <p
        data-testid="balance-display"
        className="text-3xl font-bold text-green-400"
      >
        {formatCurrency(balance)}
      </p>
    </div>
  );
}
