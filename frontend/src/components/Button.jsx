export default function Button({ children, onClick, disabled, className = '', variant = 'primary' }) {
    const baseStyles = 'inline-flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants = {
        primary: 'bg-black text-white hover:bg-zinc-800 focus:ring-black',
        secondary: 'bg-white text-black border border-gray-200 hover:border-black focus:ring-gray-400',
        outline: 'bg-transparent border border-gray-100 text-gray-500 hover:border-black hover:text-black focus:ring-black'
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    )
}
