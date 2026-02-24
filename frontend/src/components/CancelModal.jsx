import Button from './Button'

export default function CancelModal({ isOpen, onClose, onConfirm, order, loading }) {
    if (!isOpen || !order) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-xl font-semibold text-black mb-2">Cancel Order</h2>
                    <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
                        Are you sure you want to cancel your order for <span className="text-black font-medium">{order.variant.product.name}</span>? This action is permanent.
                    </p>

                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={onConfirm}
                            disabled={loading}
                            className="w-full py-4 text-[14px] font-semibold"
                        >
                            {loading ? 'Cancelling...' : 'Confirm Cancellation'}
                        </Button>
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="w-full py-3 text-[14px] text-gray-400 hover:text-black transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
