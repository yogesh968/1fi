import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function HomePage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedBrands, setSelectedBrands] = useState([])
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    useEffect(() => {
        api.getAllProducts()
            .then(data => {
                setProducts(data)
                if (data.length > 0) {
                    const prices = data.map(p => p.price)
                    setMinPrice(Math.min(...prices))
                    setMaxPrice(Math.max(...prices))
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

    const toggleBrand = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        )
    }

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())

        // Brand logic: If "Apple" is selected, match "iPhone" or "Apple"
        const brandMap = {
            'Apple': ['apple', 'iphone', 'ios'],
            'Samsung': ['samsung', 'galaxy'],
            'OnePlus': ['oneplus']
        }

        const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(brand => {
            const keywords = brandMap[brand] || [brand.toLowerCase()]
            return keywords.some(key => p.name.toLowerCase().includes(key))
        })

        const numMin = Number(minPrice) || 0
        const numMax = Number(maxPrice) || Infinity
        const matchesPrice = p.price >= numMin && p.price <= numMax

        return matchesSearch && matchesBrand && matchesPrice
    })

    const brands = ['Apple', 'Samsung', 'OnePlus']

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <Navbar />

            <main className="max-w-screen-xl mx-auto px-6 pt-24 pb-20">
                {/* Search Header */}
                <div className="mb-8">
                    <div className="relative max-w-screen-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search for smartphones..."
                            className="w-full h-14 pl-12 pr-6 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-[15px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
                        <div>
                            <div className="flex items-center gap-2 mb-6 cursor-default">
                                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                <h3 className="text-[15px] font-bold text-black uppercase tracking-tight">Filters</h3>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-4">Brand</label>
                                    <div className="space-y-3">
                                        {brands.map(brand => (
                                            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-0 accent-black cursor-pointer"
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => toggleBrand(brand)}
                                                />
                                                <span className={`text-[14px] font-medium transition-colors ${selectedBrands.includes(brand) ? 'text-black' : 'text-gray-600 group-hover:text-black'}`}>{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-4">Price Range</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black"
                                        />
                                        <span className="text-gray-400">−</span>
                                        <input
                                            type="number"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black"
                                        />
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={() => {
                                                const prices = products.map(p => p.price);
                                                setMinPrice(Math.min(...prices));
                                                setMaxPrice(Math.max(...prices));
                                            }}
                                            className="text-[10px] font-bold text-blue-600 uppercase hover:underline"
                                        >
                                            Reset Range
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product List */}
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">
                                {filteredProducts.length} products found
                            </p>
                        </div>

                        {loading ? (
                            <div className="space-y-6">
                                {[1, 2, 3].map(i => <div key={i} className="skeleton h-64 rounded-3xl" />)}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="py-20 text-center bg-white rounded-[32px] border border-gray-100">
                                <p className="text-gray-400 font-medium">No products match your filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedBrands([]);
                                        setSearchTerm('');
                                        const prices = products.map(p => p.price);
                                        setMinPrice(Math.min(...prices));
                                        setMaxPrice(Math.max(...prices));
                                    }}
                                    className="mt-4 text-black font-bold underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/products/${product.slug}`}
                                        className="flex flex-col md:flex-row bg-white rounded-[24px] overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group"
                                    >
                                        <div className="w-full md:w-80 h-80 flex items-center justify-center p-8 bg-[#f5f5f7]/50 group-hover:bg-white transition-colors duration-500">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                        </div>

                                        <div className="flex-1 p-8 flex flex-col justify-center">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-black mb-1">{product.name}</h3>
                                                    <p className="text-[14px] font-medium text-gray-400">256GB | {product.variants?.[0]?.color || 'Standard'}</p>
                                                </div>
                                                <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                                    0% EMI on 3/6 months
                                                </span>
                                            </div>

                                            <div className="space-y-4 mb-8">
                                                <div>
                                                    <p className="text-[13px] font-medium text-gray-400 mb-1 flex items-center gap-1.5">
                                                        EMI From <span className="text-xl font-black text-black tracking-tighter">
                                                            {formatCurrency(Math.round(product.price / 45))} /month
                                                        </span>
                                                    </p>
                                                    <p className="text-[12px] font-bold text-gray-500">Downpayment: {formatCurrency(Math.round(product.price * 0.02))}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[13px] font-medium text-gray-400">Price:</span>
                                                    <span className="text-lg font-black text-black">{formatCurrency(product.price)}</span>
                                                    <span className="text-sm text-gray-400 line-through font-medium">{formatCurrency(product.mrp)}</span>
                                                    <span className="text-[13px] font-bold text-emerald-600">
                                                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% Off
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <div className="flex items-center gap-2 text-[14px] font-bold text-black group-hover:translate-x-1 transition-transform">
                                                    View Details
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
