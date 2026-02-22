import { inputToDisplay } from "../utils/atm";

interface AmountDisplayProps {
  input: string;
}

export const AmountDisplay = ({ input }: AmountDisplayProps) => {
  return (
    <div className="px-4 py-3">
      <p className="text-xs uppercase tracking-widest text-zinc-300 mb-1">
        Amount
      </p>
      <p data-testid="amount-display" className="text-2xl text-green-300">
        {inputToDisplay(input)}
      </p>
    </div>
  );
}
