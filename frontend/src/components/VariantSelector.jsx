export default function VariantSelector({ variants, selectedVariant, onSelect }) {
    if (!variants || variants.length === 0) return null

    const storages = [...new Set(variants.map(v => v.storage))]
    const colors = [...new Set(variants.map(v => v.color))]

    return (
        <div className="space-y-8">
            {/* Color Selector - Dropdown like Image 2 */}
            <div className="space-y-3">
                <label className="text-[13px] font-medium text-gray-500">Color</label>
                <div className="relative group">
                    <select
                        value={selectedVariant?.color}
                        onChange={(e) => {
                            const variant = variants.find(v => v.color === e.target.value && v.storage === selectedVariant?.storage)
                                || variants.find(v => v.color === e.target.value)
                            onSelect(variant)
                        }}
                        className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-[15px] font-medium text-black appearance-none focus:outline-none focus:ring-1 focus:ring-black transition-all cursor-pointer"
                    >
                        {colors.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Storage Selector - Pill buttons like Image 1 */}
            <div className="space-y-3">
                <label className="text-[13px] font-medium text-gray-500">Storage</label>
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
                                className={`h-12 px-8 rounded-lg border text-[14px] font-bold transition-all
                                    ${isSelected
                                        ? 'border-black bg-black text-white'
                                        : 'border-gray-200 bg-white text-black hover:border-black'
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
