export default function VariantSelector({ variants, selectedVariant, onSelect }) {
    if (!variants || variants.length === 0) return null

    const storages = [...new Set(variants.map(v => v.storage))]
    const colors = [...new Set(variants.map(v => v.color))]

    return (
        <div className="space-y-6">
            {/* Finish */}
            <div>
                <label className="text-xs font-medium text-gray-500 block mb-3">Finish</label>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => {
                        const variant = variants.find(v => v.color === color && v.storage === selectedVariant?.storage)
                            || variants.find(v => v.color === color)
                        const isSelected = selectedVariant?.color === color
                        return (
                            <button
                                key={color}
                                onClick={() => onSelect(variant)}
                                className={`px-4 py-2 rounded-lg border text-[13px] font-medium transition-all
                  ${isSelected
                                        ? 'border-black bg-black text-white'
                                        : 'border-gray-200 text-gray-600 hover:border-black'
                                    }`}
                            >
                                {color}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Storage */}
            <div>
                <label className="text-xs font-medium text-gray-500 block mb-3">Storage</label>
                <div className="grid grid-cols-2 gap-3">
                    {storages.map((storage) => {
                        const variant = variants.find(v => v.storage === storage && v.color === selectedVariant?.color)
                            || variants.find(v => v.storage === storage)
                        const isSelected = selectedVariant?.storage === storage
                        return (
                            <button
                                key={storage}
                                onClick={() => onSelect(variant)}
                                className={`py-3 rounded-lg border text-[13px] font-medium transition-all
                  ${isSelected
                                        ? 'border-black bg-black text-white'
                                        : 'border-gray-200 text-gray-600 hover:border-black'
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
