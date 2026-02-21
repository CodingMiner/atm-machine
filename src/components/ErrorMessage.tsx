interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      data-testid="error-message"
      className="mx-4 mb-2 px-3 py-2 bg-red-950 text-center"
    >
      <p className="text-sm text-red-300">{message}</p>
    </div>
  );
}
