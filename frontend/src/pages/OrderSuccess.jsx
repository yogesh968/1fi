import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function OrderSuccess({ order }) {
    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 animate-fade">
            <div className="w-full max-w-sm text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-semibold text-black mb-2 tracking-tight">Order Placed</h1>
                <p className="text-gray-500 text-sm mb-10">
                    Your order <span className="text-black font-semibold">#{order.orderNumber}</span> has been successfully logged.
                </p>

                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-left space-y-4 mb-10">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Plan</span>
                        <span className="text-black font-medium">{order.tenure} Months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Monthly EMI</span>
                        <span className="text-black font-medium">{formatCurrency(order.monthlySchedule)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-4 border-t border-gray-200">
                        <span className="text-gray-500">Device</span>
                        <span className="text-black font-semibold">{order.variant.product.name}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link to="/orders" className="block w-full">
                        <Button className="w-full py-3 rounded-lg text-sm font-medium">
                            View Order History
                        </Button>
                    </Link>
                    <Link to="/" className="block w-full">
                        <button className="w-full py-3 text-sm font-medium text-gray-500 hover:text-black transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
