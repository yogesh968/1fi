import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function HomePage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.getAllProducts()
            .then(data => setProducts(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-screen-xl mx-auto px-6 pt-32 pb-20">
                <div className="mb-16">
                    <h1 className="text-4xl font-bold text-black tracking-tight mb-2">Mobiles</h1>
                    <p className="text-gray-500 font-medium">Choose your flagship device with 0% EMI</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <div key={i} className="skeleton h-[400px] rounded-3xl" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                to={`/products/${product.slug}`}
                                className="group border border-gray-100 rounded-3xl p-6 transition-all hover:border-black hover:shadow-xl hover:shadow-black/5"
                            >
                                <div className="aspect-square mb-6 flex items-center justify-center p-8 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-black">{product.name}</h3>
                                        {product.badge && (
                                            <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded uppercase tracking-wider">
                                                {product.badge}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-black">{formatCurrency(product.price)}</span>
                                        <span className="text-sm text-gray-300 line-through">{formatCurrency(product.mrp)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
