export default function VariantSelector({ variants, selectedVariant, onSelect }) {
    if (!variants || variants.length === 0) return null

    const storages = [...new Set(variants.map(v => v.storage))]
    const colors = [...new Set(variants.map(v => v.color))]

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Color Selector */}
            <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Color</label>
                <div className="relative group">
                    <select
                        value={selectedVariant?.color}
                        onChange={(e) => {
                            const variant = variants.find(v => v.color === e.target.value && v.storage === selectedVariant?.storage)
                                || variants.find(v => v.color === e.target.value)
                            onSelect(variant)
                        }}
                        className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-5 text-[14px] font-bold text-black appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 hover:border-gray-300 transition-all cursor-pointer"
                    >
                        {colors.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Storage Selector */}
            <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Storage</label>
                <div className="relative group">
                    <select
                        value={selectedVariant?.storage}
                        onChange={(e) => {
                            const variant = variants.find(v => v.storage === e.target.value && v.color === selectedVariant?.color)
                                || variants.find(v => v.storage === e.target.value)
                            onSelect(variant)
                        }}
                        className="w-full h-14 bg-white border border-gray-100 rounded-2xl px-5 text-[14px] font-bold text-black appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 hover:border-gray-300 transition-all cursor-pointer"
                    >
                        {storages.map(storage => (
                            <option key={storage} value={storage}>{storage}</option>
                        ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-black transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
