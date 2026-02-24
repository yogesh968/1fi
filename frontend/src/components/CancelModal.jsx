import Button from './Button'

export default function CancelModal({ isOpen, onClose, onConfirm, order, loading }) {
    if (!isOpen || !order) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden animate-fade border border-red-50">
                <div className="p-8 space-y-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-3xl">
                            💔
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-red-600 tracking-tight">Cancel Order?</h2>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                Are you sure you want to cancel your <span className="text-black font-bold">{order.variant.product.name}</span> subscription? This action cannot be undone.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={onConfirm}
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl text-[14px] font-black tracking-tight transition-all active:scale-[0.98]"
                        >
                            {loading ? 'Processing...' : 'Yes, Cancel Order'}
                        </Button>
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="w-full py-4 text-[14px] font-bold text-gray-400 hover:text-black transition-colors"
                        >
                            Keep Subscription
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
