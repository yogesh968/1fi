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

                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar bg-white">
                    {/* Product Details Section */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">Product Details</h4>
                        <div className="space-y-3 px-1">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Product</span>
                                <span className="text-gray-900 font-bold">{product.name}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Variant</span>
                                <span className="text-gray-900 font-bold">{variant.color}, {variant.storage}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500 font-medium">Price</span>
                                <span className="text-gray-900 font-bold">{formatCurrency(effectivePrice)}</span>
                            </div>
                        </div>
                    </div>

                    {/* EMI Plan Section (Green Box - exactly like image 2) */}
                    <div className="bg-[#f0fdf8] border border-[#00a86b]/10 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#00a86b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <h4 className="text-[13px] font-bold text-[#00a86b] uppercase tracking-wide">EMI Plan Selected</h4>
                        </div>
                        <div className="space-y-3.5">
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="text-gray-600 font-medium">Monthly Payment</span>
                                <span className="text-gray-900 font-bold">{formatCurrency(plan.monthlyAmount)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="text-gray-600 font-medium">Tenure</span>
                                <span className="text-gray-900 font-bold">{plan.tenureMonths} months</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="text-gray-600 font-medium">Interest Rate</span>
                                <span className="text-gray-900 font-bold">{plan.interestRate}% (No Cost EMI)</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="text-gray-600 font-medium">Cashback</span>
                                <span className="text-[#00a86b] font-bold">{formatCurrency(plan.cashbackAmount)}</span>
                            </div>
                            <div className="pt-3 border-t border-[#00a86b]/10 flex justify-between items-center">
                                <span className="text-gray-600 font-medium text-[14px]">Total Amount</span>
                                <span className="text-gray-900 font-black text-lg">{formatCurrency(totalAmount)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary Section (Blue Box - exactly like image 2) */}
                    <div className="bg-[#f5f9ff] border border-blue-100 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <h4 className="text-[13px] font-bold text-blue-900 uppercase tracking-wide">Payment Summary</h4>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="text-gray-600 font-medium">Pay Today (Down Payment)</span>
                                <span className="text-gray-900 font-bold">{formatCurrency(downpayment)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="text-gray-600 font-medium">Starting from next month</span>
                                <span className="text-gray-900 font-bold">{formatCurrency(plan.monthlyAmount)}/month</span>
                            </div>
                        </div>
                    </div>

                    {/* Trust Footer */}
                    <div className="flex gap-4 p-5 bg-[#fafafa] border border-gray-100 rounded-2xl items-start">
                        <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                            <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-gray-900">Secure & Backed by Mutual Funds</p>
                            <p className="text-[11.5px] text-gray-400 font-medium leading-relaxed">
                                Your EMI plan is backed by mutual funds, ensuring total transparency and safety.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-6 py-6 bg-white flex gap-3 border-t border-gray-50">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 h-14 rounded-2xl border-2 border-gray-50 bg-white text-[15px] font-bold text-gray-400 hover:text-gray-900 hover:border-gray-200 transition-all active:scale-95 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <Button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-[1.5] h-14 rounded-2xl text-[15px] font-bold bg-[#0a1125] text-white hover:bg-black shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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
