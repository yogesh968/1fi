import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductInfo from '../components/ProductInfo'
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
    if (loading) return <> <Navbar /> <div className="p-40 text-center text-gray-400">Loading...</div> </>
    if (error) return <> <Navbar /> <div className="p-40 text-center text-red-500">{error}</div> </>

    const effectivePrice = selectedVariant?.priceOverride ?? product?.price

    return (
        <>
            <Navbar />

            <main className="max-w-screen-xl mx-auto px-6 pt-24 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Thumbnails Sidebar */}
                    <div className="hidden lg:flex lg:col-span-1 flex-col gap-3">
                        {[0, 1, 2].map((i) => (
                            <button
                                key={i}
                                className={`w-full aspect-square rounded-lg border p-2 flex items-center justify-center transition-all bg-white
                    ${i === 0 ? 'border-black' : 'border-gray-100 hover:border-gray-300'}`}
                            >
                                <img src={activeImage} className="max-w-full max-h-full object-contain" alt="" />
                            </button>
                        ))}
                        <div className="w-full aspect-square rounded-lg border border-gray-100 p-2 flex flex-col items-center justify-center gap-1 opacity-50 cursor-default">
                            <div className="w-1/2 h-0.5 bg-gray-300 rounded-full" />
                            <p className="text-[8px] font-bold text-gray-400 uppercase">Cable</p>
                        </div>
                    </div>

                    {/* Product Image & "What's in the Box" Section */}
                    <div className="lg:col-span-6 space-y-20">
                        <div className="lg:sticky lg:top-24">
                            <ProductInfo product={product} selectedVariant={selectedVariant} />

                            {/* What’s in the Box Section */}
                            <div className="mt-24 pt-16 border-t border-gray-100">
                                <h3 className="text-xl font-semibold text-black mb-12 text-center lg:text-left">What’s in the Box</h3>
                                <div className="flex flex-wrap justify-center lg:justify-start items-end gap-16 sm:gap-24">
                                    <div className="flex flex-col items-center gap-6">
                                        <img src={activeImage} className="h-40 sm:h-52 object-contain" alt="" />
                                        <p className="text-[13px] font-medium text-black">{product.name}</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="h-40 sm:h-52 flex flex-col items-center justify-center">
                                            <div className="w-1 h-32 sm:h-40 bg-gray-100 rounded-full mb-2" />
                                            <div className="w-4 h-4 rounded-full border-2 border-gray-100" />
                                        </div>
                                        <p className="text-[13px] font-medium text-black">USB-C Charge Cable</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Configurations & EMI */}
                    <div className="lg:col-span-5 space-y-12">
                        <div>
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-3xl font-semibold text-black">{formatCurrency(effectivePrice)}</span>
                                <span className="text-lg text-gray-400 line-through font-normal">{formatCurrency(product.mrp)}</span>
                            </div>
                            <p className="text-[13px] text-gray-500 font-medium tracking-tight">EMI plans backed by mutual funds</p>
                        </div>

                        <VariantSelector
                            variants={product.variants}
                            selectedVariant={selectedVariant}
                            onSelect={handleVariantSelect}
                        />

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Select Plan</h3>
                                <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">0% Interest</span>
                            </div>
                            <div className="space-y-3">
                                {emiLoading ? (
                                    <div className="text-gray-400 text-sm">Loading plans...</div>
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

                        <div className="pt-8 border-t border-gray-100">
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                disabled={!selectedPlan || placingOrder}
                                className="w-full py-5 rounded-xl text-md font-medium shadow-sm hover:shadow-md transition-all"
                            >
                                {placingOrder ? 'Processing...' : `Buy on ${selectedPlan?.tenureMonths || 0} months EMI`}
                            </Button>
                        </div>
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
            </main>
        </>
    )
}
