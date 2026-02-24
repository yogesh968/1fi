const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
    return (
        <button
            onClick={() => onSelect(plan)}
            className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all text-left relative overflow-hidden group
        ${isSelected
                    ? 'border-[#001429] bg-[#f8fbff]'
                    : 'border-gray-100 bg-white hover:border-gray-300'
                }`}
        >
            <div className="flex items-center gap-5">
                {/* Custom Radio */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${isSelected ? 'border-[#001429] bg-white' : 'border-gray-200'}
                `}>
                    {isSelected && <div className="w-3 h-3 rounded-full bg-[#001429]" />}
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
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
                    0% EMI
                </span>
            </div>

            {/* Subtle Gradient Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-10 scale-x-0 group-hover:scale-x-100 transition-all duration-700 origin-left" />
        </button>
    )
}
