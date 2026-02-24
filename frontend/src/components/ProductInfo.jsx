import { useState } from 'react'

export default function ProductInfo({ product, selectedVariant }) {
    const [imgError, setImgError] = useState(false)
    const imageUrl = selectedVariant?.imageUrl || product?.imageUrl
    const fallbackImg = `https://placehold.co/800x800/ffffff/000000?text=${encodeURIComponent(product?.name || 'Device')}`

    return (
        <div className="animate-fade">
            <div className="mb-8">
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-black mb-4">
                    {product?.name}
                </h1>
                <p className="text-xl text-gray-500 max-w-md leading-relaxed">
                    {product?.description}
                </p>
            </div>

            <div className="relative aspect-square w-full max-w-lg mx-auto lg:mx-0 flex items-center justify-center p-8">
                <img
                    src={imgError ? fallbackImg : imageUrl}
                    alt={product?.name}
                    onError={() => setImgError(true)}
                    className="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-105"
                />
            </div>
        </div>
    )
}
