import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import VariantSelector from '../components/VariantSelector'
import EMIPlanCard from '../components/EMIPlanCard'
import Button from '../components/Button'
import ConfirmModal from '../components/ConfirmModal'
import OrderSuccess from './OrderSuccess'
import api from '../services/api'

const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export default function ProductPage() {
    const { slug } = useParams()

    const [product, setProduct] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [emiPlans, setEmiPlans] = useState([])
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [loading, setLoading] = useState(true)
    const [emiLoading, setEmiLoading] = useState(false)
    const [error, setError] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [placingOrder, setPlacingOrder] = useState(false)
    const [confirmedOrder, setConfirmedOrder] = useState(null)
    const [activeThumbnail, setActiveThumbnail] = useState(0)

    console.log('🚀 1Fi EMI Store Frontend Version: 2.3 (Final Sync Verification)')

    useEffect(() => {
        if (product) {
            console.log(`📦 Variants loaded for ${product.name}:`, product.variants?.length)
            if (product.variants) console.table(product.variants.map(v => ({ color: v.color, storage: v.storage })))
        }
    }, [product])

    useEffect(() => {
        setLoading(true)
        setError(null)
        setConfirmedOrder(null)

        api.getProductBySlug(slug)
            .then((data) => {
                setProduct(data)
                const firstVariant = data.variants?.[0] || null
                setSelectedVariant(firstVariant)
                setActiveThumbnail(0) // Reset to first thumb
                if (firstVariant?.emiPlans?.length) {
                    const plansAsc = [...firstVariant.emiPlans].sort((a, b) => a.tenureMonths - b.tenureMonths)
                    setEmiPlans(plansAsc)
                    setSelectedPlan(plansAsc[0])
                }
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [slug])

    const handleVariantSelect = async (variant) => {
        if (!variant || variant.id === selectedVariant?.id) return
        setSelectedVariant(variant)
        setActiveThumbnail(0) // Reset to first thumb
        setSelectedPlan(null)
        setEmiLoading(true)
        try {
            const plans = await api.getEmiPlans(variant.id)
            const plansAsc = [...plans].sort((a, b) => a.tenureMonths - b.tenureMonths)
            setEmiPlans(plansAsc)
            setSelectedPlan(plansAsc[0] || null)
        } catch (e) {
            console.error(e)
        } finally {
            setEmiLoading(false)
        }
    }

    const handleConfirmOrder = async () => {
        setPlacingOrder(true)
        try {
            const order = await api.createOrder(selectedVariant.id, selectedPlan.id)
            setConfirmedOrder(order)
            setIsModalOpen(false)
        } catch (e) {
            alert("Something went wrong. Please try again.")
        } finally {
            setPlacingOrder(false)
        }
    }

    if (confirmedOrder) return <OrderSuccess order={confirmedOrder} />
    if (loading) return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-40 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-gray-100 border-t-black rounded-full animate-spin" />
                    <p className="text-gray-400 font-medium tracking-tight">Loading details...</p>
                </div>
            </div>
        </div>
    )
    if (error) return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-40 text-center">
                <p className="text-red-500 font-medium">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-sm font-bold text-black underline">Reload</button>
            </div>
        </div>
    )

    const effectivePrice = selectedVariant?.priceOverride ?? product?.price
    const discountPercent = Math.round(((product.mrp - effectivePrice) / product.mrp) * 100)
    const downpayment = Math.round(effectivePrice * 0.02)

    // Detail images mapping for products
    const detailImages = {
        'iphone-17-pro': {
            'Orange': '/images/iphone-orange-detail.png',
            'White': '/images/iphone-white-detail.png',
            'Blue': '/images/iphone-blue-detail.png'
        },
        'samsung-s24-ultra': '/images/samsung-s24-ultra-detail.png',
        'google-pixel-9-pro': '/images/google-pixel-9-pro-detail.png'
    }

    // Define images for the current view
    const currentDetailImg = product?.slug === 'iphone-17-pro'
        ? detailImages['iphone-17-pro'][selectedVariant?.color]
        : detailImages[product?.slug]

    const productImages = [
        selectedVariant?.imageUrl || product?.imageUrl,
        currentDetailImg || '/images/iphone-17-pro-silver.png'
    ]

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-screen-xl mx-auto px-6 pt-24 pb-20">
                {/* Back Link */}
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left: Product Showcase */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-[#f9f9f9] rounded-[32px] aspect-[4/5] md:aspect-square flex items-center justify-center p-12 relative overflow-hidden">
                            <img
                                src={productImages[activeThumbnail]}
                                className="w-full h-full object-contain transition-all duration-700 ease-out animate-fade-in"
                                alt={product.name}
                                key={activeThumbnail}
                            />
                        </div>

                        {/* Thumbnails functional mapping */}
                        <div className="flex justify-center gap-4">
                            {productImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveThumbnail(idx)}
                                    className={`w-20 h-20 rounded-2xl border-2 p-2 bg-white overflow-hidden transition-all duration-300
                                        ${activeThumbnail === idx ? 'border-black scale-105 shadow-md' : 'border-gray-100 hover:border-gray-300 opacity-60 hover:opacity-100'}
                                    `}
                                >
                                    <img src={img} className="w-full h-full object-contain" alt={`Thumbnail ${idx + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details & Choice */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-1">
                            <h1 className="text-4xl font-bold text-black tracking-tight">{product.name}</h1>
                            <p className="text-lg font-semibold text-gray-400">
                                {selectedVariant?.storage || '256GB'} • {selectedVariant?.color || 'Deep Blue'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-black">{formatCurrency(effectivePrice)}</span>
                                <span className="text-xl text-gray-300 line-through font-semibold">{formatCurrency(product.mrp)}</span>
                                <span className="text-lg font-semibold text-emerald-600">{discountPercent}% off</span>
                            </div>

                            {/* Downpayment Highlight - Matches 2nd Image */}
                            <div className="bg-[#e8fbf3] rounded-xl p-3 flex items-center gap-3 border border-emerald-100/50">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                <p className="text-[14px] font-semibold text-emerald-900">
                                    Pay just <span className="font-bold">{formatCurrency(downpayment)}</span> to get started
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8 pt-2">
                            <VariantSelector
                                variants={product.variants}
                                selectedVariant={selectedVariant}
                                onSelect={handleVariantSelect}
                            />

                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        <h3 className="text-[15px] font-bold uppercase tracking-tight text-black">Choose your EMI plan</h3>
                                    </div>
                                </div>

                                <div id="emi-plans-container"
                                    style={{ height: '260px', overflowY: 'scroll', display: 'block' }}
                                    className="space-y-4 pr-3 custom-scrollbar"
                                >
                                    {emiLoading ? (
                                        <div className="flex flex-col gap-4">
                                            {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-24 rounded-2xl" />)}
                                        </div>
                                    ) : (
                                        emiPlans.map((plan) => (
                                            <EMIPlanCard
                                                key={plan.id}
                                                plan={plan}
                                                isSelected={selectedPlan?.id === plan.id}
                                                onSelect={setSelectedPlan}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                disabled={!selectedPlan || placingOrder}
                                className="w-full bg-[#0a1128] hover:bg-black text-white py-5 rounded-xl text-[16px] font-bold tracking-tight transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                            >
                                {placingOrder ? (
                                    <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span>Proceed with {selectedPlan?.tenureMonths || 0}-month EMI</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-24 space-y-16">
                    <div className="pt-16 border-t border-gray-100 max-w-2xl">
                        <h2 className="text-2xl font-bold text-black mb-6 tracking-tight">What's in the Box</h2>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="bg-gray-50 aspect-square rounded-2xl flex items-center justify-center p-8">
                                    <img src={productImages[0]} className="w-full h-auto object-contain opacity-80" alt="" />
                                </div>
                                <p className="text-center text-sm font-medium text-black">{product.name}</p>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gray-50 aspect-square rounded-2xl flex items-center justify-center p-8">
                                    <div className="w-full h-1 bg-gray-300 rounded-full" />
                                </div>
                                <p className="text-center text-sm font-medium text-black">USB-C Charge Cable</p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl">
                        <h2 className="text-2xl font-bold text-black mb-6 tracking-tight">About {product.name}</h2>
                        <p className="text-lg text-gray-500 leading-relaxed font-normal">
                            {product.description}
                        </p>
                    </div>
                </div>

                <ConfirmModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmOrder}
                    product={product}
                    variant={selectedVariant}
                    plan={selectedPlan}
                    loading={placingOrder}
                />
            </main >
        </div >
    )
}
