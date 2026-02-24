const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
    const isZeroInterest = plan.interestRate === 0

    return (
        <button
            onClick={() => onSelect(plan)}
            className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all text-left relative overflow-hidden group
        ${isSelected
                    ? 'border-blue-600 bg-white ring-1 ring-blue-600 shadow-lg shadow-blue-600/5'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
        >
            <div className="flex items-center gap-5">
                {/* Custom Radio Icon - Solid Blue when selected */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all bg-white
                    ${isSelected ? 'border-blue-600' : 'border-gray-200'}
                `}>
                    {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex items-baseline gap-1.5 mb-0.5">
                        <span className="text-xl font-bold text-black tracking-tight">{formatCurrency(plan.monthlyAmount)}</span>
                        <span className="text-[13px] font-bold text-gray-400">/ mo</span>
                    </div>
                    <div className="text-[13px] font-bold text-gray-500">
                        {plan.tenureMonths} Months
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end justify-center">
                <div className="text-[14px] font-bold text-emerald-600 mb-0.5">
                    {formatCurrency(plan.cashbackAmount || 7500)} Cashback
                </div>
                <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    {isZeroInterest ? '0% INTEREST' : `${plan.interestRate}% interest`}
                </div>
            </div>

            {/* Subtle Gradient Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-600/5 opacity-0 group-hover:opacity-10 scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left" />
        </button>
    )
}
