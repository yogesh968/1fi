const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
    const isZeroInterest = plan.interestRate === 0

    return (
        <button
            onClick={() => onSelect(plan)}
            className={`w-full flex items-center justify-between p-5 rounded-xl border-2 transition-all text-left relative overflow-hidden
        ${isSelected
                    ? 'border-black bg-white ring-1 ring-black'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
        >
            <div className="flex items-center gap-4">
                {/* Minimal Radio Icon - Matches 2nd Image Checkmark style */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${isSelected ? 'border-black bg-black' : 'border-gray-200'}
                `}>
                    {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>

                <div>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-black tracking-tight">{formatCurrency(plan.monthlyAmount)}</span>
                        <span className="text-[13px] font-medium text-gray-400">× {plan.tenureMonths} months</span>
                    </div>
                    <div className="text-[12px] font-semibold text-emerald-600">
                        Cashback of {formatCurrency(plan.cashbackAmount || 7500)}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end">
                {isZeroInterest && (
                    <span className="bg-[#e8fbf3] text-[#2d9d78] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        0% EMI
                    </span>
                )}
            </div>
        </button>
    )
}
