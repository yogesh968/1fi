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
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-screen-xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 animate-fade">Premier Hardware</h2>
                        <h1 className="text-5xl md:text-7xl font-black text-black tracking-tight leading-[0.9] animate-fade">
                            Elite Experience. <br />
                            Simple Payments.
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-medium pt-4 animate-fade">
                            Shop the world's most advanced smartphones with 0% interest EMI plans backed by your mutual funds.
                        </p>
                    </div>

                    <div className="flex justify-center gap-4 pt-4 animate-fade">
                        <a href="#shop" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                            Start Shopping
                        </a>
                        <Link to="/orders" className="bg-gray-50 text-black px-8 py-4 rounded-full font-bold border border-gray-100 hover:bg-gray-100 transition-colors">
                            My Subscriptions
                        </Link>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section id="shop" className="max-w-screen-xl mx-auto px-6 py-24 border-t border-gray-50">
                <div className="flex items-end justify-between mb-16">
                    <div className="space-y-2">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">The Collection</h3>
                        <h2 className="text-4xl font-black text-black tracking-tight">Featured Mobile</h2>
                    </div>
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-bold text-emerald-600">0% Interest on all plans</p>
                        <p className="text-xs text-gray-400">Guaranteed genuine hardware</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <div key={i} className="skeleton h-[500px] rounded-[32px]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                to={`/products/${product.slug}`}
                                className="group relative bg-white border border-gray-100 rounded-[40px] p-8 hover:border-black transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
                            >
                                <div className="aspect-[4/5] mb-8 flex items-center justify-center p-8 bg-gray-50/50 rounded-[32px] group-hover:bg-white transition-colors duration-500 overflow-hidden">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-2xl font-black text-black tracking-tight">{product.name}</h4>
                                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Starting from</p>
                                        </div>
                                        {product.badge && (
                                            <span className="bg-black text-white text-[10px] font-black px-2 py-1 rounded ml-2">
                                                {product.badge}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-baseline gap-2 pt-2">
                                        <span className="text-3xl font-black text-black">{formatCurrency(product.price)}</span>
                                        <span className="text-sm text-gray-300 line-through font-bold">{formatCurrency(product.mrp)}</span>
                                    </div>

                                    <div className="pt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        <span className="text-xs font-black uppercase tracking-widest text-blue-600">Configure Now</span>
                                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer / Trust Section */}
            <footer className="bg-black text-white pt-24 pb-12 px-6">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-2 space-y-6">
                            <h1 className="text-3xl font-black tracking-tighter">PRIME STORE</h1>
                            <p className="text-gray-500 max-w-xs font-medium">
                                The most sophisticated hardware ownership experience. Powered by logic, secured by assets.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h5 className="font-bold uppercase tracking-widest text-[11px] text-gray-400">Products</h5>
                            <ul className="space-y-2 text-sm text-gray-500 font-bold">
                                <li><Link to="/products/iphone-17-pro" className="hover:text-white transition-colors">iPhone</Link></li>
                                <li><Link to="/products/samsung-s24-ultra" className="hover:text-white transition-colors">Galaxy</Link></li>
                                <li><Link to="/products/google-pixel-9-pro" className="hover:text-white transition-colors">Pixel</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h5 className="font-bold uppercase tracking-widest text-[11px] text-gray-400">Account</h5>
                            <ul className="space-y-2 text-sm text-gray-500 font-bold">
                                <li><Link to="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
                                <li><a href="#" className="hover:text-white transition-colors">Settings</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6">
                        <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">© 2026 PRIME STORE PRIVATE LIMITED. ALL RIGHTS RESERVED.</p>
                        <div className="flex gap-8 text-[11px] font-bold text-gray-600 uppercase tracking-widest">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
