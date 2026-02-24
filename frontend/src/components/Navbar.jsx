import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const { pathname } = useLocation()
    const isHomePage = pathname === '/'

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link to="/" className="text-xl font-bold tracking-tight text-black">
                        EMI Store
                    </Link>

                    {/* Only show these shortcuts on the Home Page */}
                    {isHomePage && (
                        <nav className="hidden md:flex items-center gap-6">
                            <Link to="/products/iphone-17-pro" className="text-[13px] font-bold text-gray-400 hover:text-black transition-colors">iPhone</Link>
                            <Link to="/products/samsung-s25-ultra" className="text-[13px] font-bold text-gray-400 hover:text-black transition-colors">Galaxy</Link>
                            <Link to="/products/oneplus-13" className="text-[13px] font-bold text-gray-400 hover:text-black transition-colors">Pixel</Link>
                        </nav>
                    )}
                </div>

                <Link
                    to="/orders"
                    className="text-[13px] font-bold px-5 py-2 rounded-full border border-gray-100 bg-white hover:border-black transition-all"
                >
                    My Orders
                </Link>
            </div>
        </header>
    )
}
