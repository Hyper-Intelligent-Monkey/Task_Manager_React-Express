
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    className?: string;
};

export function Button({ children, className = "", ...props }: ButtonProps) {
    return (
        <button 
            {...props}
            className={`bg-accent px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[color-mix(in_srgb,var(--accent),black_10%)] ${className}`}
        >
            {children}
        </button>
    );
}
