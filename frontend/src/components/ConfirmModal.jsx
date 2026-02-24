import Button from './Button'

export default function ConfirmModal({ isOpen, onClose, onConfirm, product, variant, plan, loading }) {
    if (!isOpen || !product || !variant || !plan) return null

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

    const effectivePrice = variant.priceOverride ?? product.price
    const downpayment = Math.round(effectivePrice * 0.02)
    const totalAmount = plan.monthlyAmount * plan.tenureMonths

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-slide-up border border-gray-100">
                {/* Header */}
                <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50 bg-gray-50/30">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Order Summary</h3>
                    <button
                        onClick={onClose}
                        className="p-2.5 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-400 hover:text-black"
                        disabled={loading}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    {/* Compact Product Identity */}
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-[#f9f9f9] rounded-2xl p-4 flex items-center justify-center border border-gray-100/50">
                            <img src={variant.imageUrl || product.imageUrl} className="w-full h-full object-contain" alt={product.name} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xl font-bold text-black tracking-tight leading-tight">{product.name}</h4>
                            <p className="text-sm font-semibold text-gray-400">{variant.color} • {variant.storage}</p>
                            <div className="text-lg font-black text-black pt-1">{formatCurrency(effectivePrice)}</div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* EMI Plan Section (Premium Card) */}
                        <div className="bg-[#f0fdf9] border border-[#00a86b]/10 rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a86b]/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                            <div className="flex items-center gap-2 mb-5">
                                <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-700">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </span>
                                <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest">Selected EMI Plan</h4>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-emerald-800/60">Monthly Payment</span>
                                    <span className="text-lg font-black text-emerald-900">{formatCurrency(plan.monthlyAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-emerald-800/60 font-medium">Interest Rate</span>
                                    <span className={`font-bold px-2 py-0.5 rounded-md ${plan.interestRate === 0 ? 'bg-emerald-200/50 text-emerald-800' : 'bg-gray-200 text-gray-600'}`}>
                                        {plan.interestRate}% {plan.interestRate === 0 && ' (No Cost)'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-emerald-800/60 font-medium">Cashback Reward</span>
                                    <span className="text-emerald-600 font-black">+{formatCurrency(plan.cashbackAmount)}</span>
                                </div>
                                <div className="pt-4 border-t border-emerald-900/10 flex justify-between items-center">
                                    <span className="text-sm font-bold text-emerald-900">Effective Total</span>
                                    <span className="text-xl font-black text-emerald-900 tracking-tighter">{formatCurrency(totalAmount)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Breakdown (Clean List) */}
                        <div className="bg-blue-50/30 border border-blue-100/50 rounded-3xl p-6 space-y-5">
                            <div className="flex items-center justify-between pb-3 border-b border-blue-100/30 text-sm">
                                <span className="font-bold text-blue-900">Pay Today</span>
                                <span className="text-lg font-black text-blue-900">{formatCurrency(downpayment)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-blue-900/60">Monthly installments</span>
                                <span className="font-black text-blue-900">{formatCurrency(plan.monthlyAmount)}/mo</span>
                            </div>
                        </div>

                        {/* Trust Banner */}
                        <div className="flex gap-4 p-5 bg-[#fcfcfc] border border-gray-100 rounded-3xl items-center shadow-sm">
                            <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm font-black text-gray-900 tracking-tight uppercase">Secure Checkout</p>
                                <p className="text-[11px] text-gray-400 font-bold leading-tight">
                                    Backed by Mutual Funds & 256-bit Encryption
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simplified Sticky-like Footer */}
                <div className="px-8 py-8 bg-white flex gap-4 border-t border-gray-50">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 h-14 rounded-2xl border-2 border-gray-100 bg-white text-[15px] font-black text-gray-400 hover:text-black hover:border-black transition-all active:scale-95 disabled:opacity-50"
                    >
                        Back
                    </button>
                    <Button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-[2] h-14 rounded-2xl text-[16px] font-black bg-black text-white hover:bg-gray-800 shadow-xl shadow-black/5 flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Confirm Purchase</span>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
