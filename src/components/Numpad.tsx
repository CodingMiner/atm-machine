interface NumpadProps {
  onDigit: (digit: string) => void;
  onClear: () => void;
  onBackspace: () => void;
}

const DIGIT_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const Numpad = ({ onDigit, onClear, onBackspace }: NumpadProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      {DIGIT_KEYS.map((digit) => (
        <button
          key={digit}
          data-testid={`digit-${digit}`}
          onClick={() => onDigit(digit)}
          className="h-14 rounded-lg bg-zinc-800 text-white text-xl font-medium hover:bg-zinc-700 cursor-pointer"
        >
          {digit}
        </button>
      ))}

      <button
        data-testid="button-clear"
        onClick={onClear}
        className="h-14 rounded-lg bg-amber-900 text-amber-200 text-sm font-semibold hover:bg-amber-800 cursor-pointer"
      >
        C
      </button>

      <button
        data-testid="digit-0"
        onClick={() => onDigit("0")}
        className="h-14 rounded-lg bg-zinc-800 text-white text-xl font-medium hover:bg-zinc-700 cursor-pointer"
      >
        0
      </button>

      <button
        data-testid="button-backspace"
        onClick={onBackspace}
        className="h-14 rounded-lg bg-red-950 text-red-300 text-xl hover:bg-red-900 cursor-pointer"
      >
        ←
      </button>
    </div>
  );
}
