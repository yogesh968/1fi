import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
    const [activeImage, setActiveImage] = useState(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        setConfirmedOrder(null)

        api.getProductBySlug(slug)
            .then((data) => {
                setProduct(data)
                const firstVariant = data.variants?.[0] || null
                setSelectedVariant(firstVariant)
                setActiveImage(firstVariant?.imageUrl || data.imageUrl)
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
        setActiveImage(variant.imageUrl || product.imageUrl)
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

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-screen-xl mx-auto px-6 pt-24 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left: Product Showcase */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="bg-[#f5f5f7]/50 rounded-[40px] p-12 aspect-[4/3] flex items-center justify-center relative group">
                            <img
                                src={activeImage}
                                className="max-w-[80%] max-h-full object-contain group-hover:scale-105 transition-transform duration-1000 ease-out"
                                alt={product.name}
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex justify-center gap-4">
                            {[0, 1, 2].map((i) => (
                                <button
                                    key={i}
                                    className={`w-20 h-20 rounded-2xl border-2 p-2 flex items-center justify-center transition-all bg-white
                        ${i === 0 ? 'border-black' : 'border-gray-100 hover:border-gray-300'}`}
                                >
                                    <img src={activeImage} className="max-w-full max-h-full object-contain" alt="" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details & Choice */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-2">
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

                            {/* Downpayment Highlight */}
                            <div className="bg-emerald-50 rounded-2xl p-4 flex items-center justify-between border border-emerald-100/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-semibold text-emerald-900 leading-tight">
                                        Pay just <span className="text-lg font-bold">{formatCurrency(downpayment)}</span> to get started
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 pt-4">
                            <VariantSelector
                                variants={product.variants}
                                selectedVariant={selectedVariant}
                                onSelect={handleVariantSelect}
                            />

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-black">Choose your EMI plan</h3>
                                </div>

                                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar transition-all">
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
                                <p className="text-[11px] font-semibold text-gray-400 pl-1 mt-2">EMI starts from next billing cycle</p>
                            </div>
                        </div>

                        <div className="pt-6 space-y-6">
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                disabled={!selectedPlan || placingOrder}
                                className="w-full bg-[#001429] hover:bg-black text-white py-6 rounded-[24px] text-lg font-bold tracking-tight shadow-2xl shadow-black/10 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                {placingOrder ? (
                                    <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Proceed with {selectedPlan?.tenureMonths || 0}-month EMI</span>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </Button>

                            <div className="flex items-center justify-center gap-8 pt-4">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest text-center">Secure checkout</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">Backed by mutual funds</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-32 pt-16 border-t border-gray-100">
                    <h2 className="text-2xl font-bold text-black mb-6">About {product.name}</h2>
                    <p className="text-lg text-gray-500 leading-relaxed font-normal">
                        {product.description}
                    </p>
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
            </main>
        </div>
    )
}
