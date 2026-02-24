const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
    return (
        <button
            onClick={() => onSelect(plan)}
            className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all text-left bg-white
        ${isSelected
                    ? 'border-blue-600 bg-blue-50/10'
                    : 'border-gray-100 hover:border-gray-300'
                }`}
        >
            <div className="flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
          ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div>
                    <span className="text-lg font-semibold text-black">{formatCurrency(plan.monthlyAmount)}</span>
                    <span className="text-xs text-gray-400 ml-1">/ mo</span>
                    <p className="text-[13px] text-gray-500 font-medium">{plan.tenureMonths} Months</p>
                </div>
            </div>

            <div className="text-right">
                {plan.cashbackAmount > 0 && (
                    <p className="text-[12px] font-bold text-emerald-600 mb-0.5">
                        {formatCurrency(plan.cashbackAmount)} Cashback
                    </p>
                )}
                <p className="text-[12px] text-gray-400 font-medium uppercase tracking-tighter">
                    0% Interest
                </p>
            </div>
        </button>
    )
}
