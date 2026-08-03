interface LoadingButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  children: React.ReactNode;
  loadingText?: string;
  onClick?: () => void;
}

export default function LoadingButton({
  isLoading = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  loadingText = 'Loading...',
  onClick,
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn-interactive flex items-center justify-center gap-2 transition-all ${className} ${
        isLoading || disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
