export default function VariantSelector({ variants, selectedVariant, onSelect }) {
    if (!variants || variants.length === 0) return null

    const storages = [...new Set(variants.map(v => v.storage))]
    const colors = [...new Set(variants.map(v => v.color))]

    return (
        <div className="space-y-6">
            {/* Color Selector */}
            <div className="space-y-3">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest pl-1">Color</label>
                <div className="flex flex-wrap gap-3">
                    {colors.map(color => {
                        const isSelected = selectedVariant?.color === color;
                        return (
                            <button
                                key={color}
                                onClick={() => {
                                    const variant = variants.find(v => v.color === color && v.storage === selectedVariant?.storage)
                                        || variants.find(v => v.color === color)
                                    onSelect(variant)
                                }}
                                className={`px-6 py-3 rounded-2xl border text-sm font-medium transition-all
                                    ${isSelected
                                        ? 'border-black bg-black text-white shadow-lg shadow-black/10'
                                        : 'border-gray-100 bg-white text-gray-600 hover:border-gray-300'
                                    }`}
                            >
                                {color}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Storage Selector */}
            <div className="space-y-3">
                <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest pl-1">Storage</label>
                <div className="flex flex-wrap gap-3">
                    {storages.map(storage => {
                        const isSelected = selectedVariant?.storage === storage;
                        return (
                            <button
                                key={storage}
                                onClick={() => {
                                    const variant = variants.find(v => v.storage === storage && v.color === selectedVariant?.color)
                                        || variants.find(v => v.storage === storage)
                                    onSelect(variant)
                                }}
                                className={`px-6 py-3 rounded-2xl border text-sm font-medium transition-all
                                    ${isSelected
                                        ? 'border-black bg-black text-white shadow-lg shadow-black/10'
                                        : 'border-gray-100 bg-white text-gray-600 hover:border-gray-300'
                                    }`}
                            >
                                {storage}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
