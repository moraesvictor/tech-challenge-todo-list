'use client';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <div
      className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          aria-label="Fechar erro"
        >
          <span className="text-red-800 text-xl">&times;</span>
        </button>
      )}
    </div>
  );
};

