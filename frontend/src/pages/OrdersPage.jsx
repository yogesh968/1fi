import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CancelModal from '../components/CancelModal'
import api from '../services/api'

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [orderToCancel, setOrderToCancel] = useState(null)
    const [cancelling, setCancelling] = useState(false)

    useEffect(() => {
        api.getOrders()
            .then(data => setOrders(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    const handleCancelClick = (order) => {
        setOrderToCancel(order)
        setIsModalOpen(true)
    }

    const handleConfirmCancel = async () => {
        if (!orderToCancel) return
        setCancelling(true)
        try {
            await api.cancelOrder(orderToCancel.id)
            setOrders(orders.map(o => o.id === orderToCancel.id ? { ...o, status: 'CANCELLED' } : o))
            setIsModalOpen(false)
            setOrderToCancel(null)
        } catch (err) {
            console.error(err)
            alert('Failed to cancel order. Please try again.')
        } finally {
            setCancelling(false)
        }
    }

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-screen-md mx-auto px-6 pt-24 pb-20">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-black tracking-tight mb-2">My Orders</h1>
                    <p className="text-gray-500 font-medium">{orders.filter(o => o.status !== 'CANCELLED').length} active subscriptions</p>
                </div>

                {loading ? (
                    <div className="space-y-6">
                        {[1, 2].map(i => <div key={i} className="skeleton h-40 rounded-[32px]" />)}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-[32px]">
                        <p className="text-gray-300 font-bold uppercase tracking-widest text-xs">No Orders Found</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className={`p-8 rounded-[32px] border transition-all duration-500 ${order.status === 'CANCELLED'
                                        ? 'bg-gray-50/50 border-gray-100 grayscale opacity-60'
                                        : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-black/5'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-10">
                                    <div className="flex gap-6">
                                        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 p-2">
                                            <img
                                                src={order.variant.imageUrl}
                                                alt=""
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-black mb-1">{order.variant.product.name}</h3>
                                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                                                {order.variant.storage} · {order.variant.color}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${order.status === 'CANCELLED'
                                                ? 'text-red-600 bg-red-50 border-red-100'
                                                : 'text-emerald-600 bg-emerald-50 border-emerald-100'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <p className="text-[11px] text-gray-300 mt-3 font-bold">#{order.orderNumber}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-gray-50">
                                    <div className="flex items-center gap-12">
                                        <div>
                                            <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Monthly</label>
                                            <p className="text-lg font-black text-black">{formatCurrency(order.monthlySchedule)}</p>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Duration</label>
                                            <p className="text-lg font-black text-black">{order.tenure} <span className="text-gray-400">Mo</span></p>
                                        </div>
                                        <div className="hidden sm:block">
                                            <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Started</label>
                                            <p className="text-lg font-black text-black">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    {order.status !== 'CANCELLED' && (
                                        <button
                                            onClick={() => handleCancelClick(order)}
                                            className="text-[11px] font-black text-red-500 hover:text-red-700 uppercase tracking-[0.15em] transition-all flex items-center gap-2 group"
                                        >
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">💔</span>
                                            Cancel Plan
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <CancelModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmCancel}
                    order={orderToCancel}
                    loading={cancelling}
                />
            </main>
        </div>
    )
}
