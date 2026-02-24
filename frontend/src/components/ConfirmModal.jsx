import Button from './Button'

export default function ConfirmModal({ isOpen, onClose, onConfirm, product, variant, plan, loading }) {
    if (!isOpen || !product || !variant || !plan) return null

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

    const effectivePrice = variant.priceOverride ?? product.price
    const downpayment = Math.round(effectivePrice * 0.02)
    const totalAmount = plan.monthlyAmount * plan.tenureMonths

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-[24px] w-full max-w-lg overflow-hidden shadow-2xl animate-slide-up">
                {/* Header */}
                <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">Confirm Your Purchase</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={loading}
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {/* Product Details Section */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">Product Details</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium tracking-tight">Product</span>
                                <span className="text-gray-900 font-bold">{product.name}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium tracking-tight">Variant</span>
                                <span className="text-gray-900 font-bold">{variant.color}, {variant.storage}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium tracking-tight">Price</span>
                                <span className="text-gray-900 font-bold">{formatCurrency(effectivePrice)}</span>
                            </div>
                        </div>
                    </div>

                    {/* EMI Plan Section (Green Box) */}
                    <div className="bg-[#f0fdf8] border border-[#00a86b]/20 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-5 h-5 text-[#00a86b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <h4 className="text-sm font-bold text-[#00a86b] tracking-tight">EMI Plan Selected</h4>
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium tracking-tight">Monthly Payment</span>
                                <span className="text-gray-900 font-bold">{formatCurrency(plan.monthlyAmount)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium tracking-tight">Tenure</span>
                                <span className="text-gray-900 font-bold">{plan.tenureMonths} months</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium tracking-tight">Interest Rate</span>
                                <span className="text-gray-900 font-bold">{plan.interestRate}%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium tracking-tight">Cashback</span>
                                <span className="text-[#00a86b] font-bold">{formatCurrency(plan.cashbackAmount)}</span>
                            </div>
                            <div className="pt-2 border-t border-[#00a86b]/10 flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium tracking-tight">Total Amount</span>
                                <span className="text-gray-900 font-black text-base">{formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary Section (Blue Box) */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <h4 className="text-sm font-bold text-blue-900 tracking-tight">Payment Summary</h4>
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium tracking-tight">Pay Today (Down Payment)</span>
                                <span className="text-gray-900 font-bold">{formatCurrency(downpayment)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium tracking-tight">Starting from next month</span>
                                <span className="text-gray-900 font-bold">{formatCurrency(plan.monthlyAmount)}/month</span>
                            </div>
                        </div>
                    </div>

                    {/* Trust Section */}
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                        <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 tracking-tight">Secure & Backed by Mutual Funds</p>
                            <p className="text-[12px] text-gray-500 font-medium leading-relaxed mt-0.5">
                                Your EMI plan is backed by mutual funds, ensuring transparency and security for your purchase.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-6 py-6 bg-gray-50 flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 h-12 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <Button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
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
