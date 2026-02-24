import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.getOrders()
            .then(data => setOrders(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-screen-md mx-auto px-6 pt-24 pb-20">
                <div className="mb-12">
                    <h1 className="text-3xl font-semibold text-black tracking-tight mb-2">My Orders</h1>
                    <p className="text-gray-500 text-sm">{orders.length} subscriptions active</p>
                </div>

                {loading ? (
                    <div className="space-y-6">
                        {[1, 2].map(i => <div key={i} className="skeleton h-32 rounded-2xl" />)}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-24 border border-dashed border-gray-200 rounded-2xl">
                        <p className="text-gray-400 text-sm">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4">
                                        <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-50">
                                            <img src={order.variant.imageUrl} alt="" className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all" />
                                        </div>
                                        <div>
                                            <h3 className="text-md font-semibold text-black">{order.variant.product.name}</h3>
                                            <p className="text-gray-500 text-[13px]">{order.variant.storage} · {order.variant.color}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">Confirmed</span>
                                        <p className="text-[11px] text-gray-400 mt-2 font-medium">#{order.orderNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-10 pt-6 border-t border-gray-50">
                                    <div>
                                        <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Monthly</label>
                                        <p className="text-md font-semibold text-black">{formatCurrency(order.monthlySchedule)}</p>
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Duration</label>
                                        <p className="text-md font-semibold text-black">{order.tenure} Months</p>
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider block mb-1">Started</label>
                                        <p className="text-md font-semibold text-black">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
