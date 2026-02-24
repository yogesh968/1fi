import Button from './Button'

export default function ConfirmModal({ isOpen, onClose, onConfirm, product, variant, plan, loading }) {
    if (!isOpen) return null

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-fade p-8">
                <h3 className="text-xl font-semibold text-black mb-1">Confirm Subscription</h3>
                <p className="text-sm text-gray-500 mb-6">Review your monthly commitment.</p>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                        <span className="text-gray-500">Device</span>
                        <span className="text-black font-medium">{product.name}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                        <span className="text-gray-500">Storage</span>
                        <span className="text-black font-medium">{variant.storage}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                        <span className="text-gray-500">Monthly EMI</span>
                        <span className="text-black font-medium">{formatCurrency(plan.monthlyAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 font-medium">
                        <span className="text-gray-500">Tenure</span>
                        <span className="text-black">{plan.tenureMonths} Months</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="py-2.5 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <Button
                        onClick={onConfirm}
                        disabled={loading}
                        className="py-2.5 rounded-lg text-sm font-medium"
                    >
                        {loading ? 'Confirming...' : 'Yes, Confirm'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
