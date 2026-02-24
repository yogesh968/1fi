const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
    const isZeroInterest = plan.interestRate === 0

    return (
        <button
            onClick={() => onSelect(plan)}
            className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all text-left relative overflow-hidden group
        ${isSelected
                    ? 'border-[#001429] bg-[#f8fbff] ring-1 ring-[#001429]'
                    : 'border-gray-100 bg-white hover:border-gray-300'
                }`}
        >
            <div className="flex items-center gap-5">
                {/* Custom Radio Icon */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all bg-white
                    ${isSelected ? 'border-black' : 'border-gray-200'}
                `}>
                    {isSelected && (
                        <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-xl font-black text-black tracking-tight">{formatCurrency(plan.monthlyAmount)}</span>
                        <span className="text-[13px] font-bold text-gray-400">× {plan.tenureMonths} months</span>
                    </div>
                    <div className="text-[12px] font-bold text-emerald-600">
                        Cashback of {formatCurrency(plan.cashbackAmount || 7500)}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border transition-colors
                    ${isZeroInterest
                        ? 'text-emerald-600 bg-emerald-50 border-emerald-100'
                        : 'text-gray-400 bg-gray-50 border-gray-100'
                    }`}
                >
                    {isZeroInterest ? '0% EMI' : `${plan.interestRate}% interest`}
                </span>
            </div>

            {/* Subtle Gradient Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-10 scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left" />
        </button>
    )
}
