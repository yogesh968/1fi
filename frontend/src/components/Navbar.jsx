import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const { pathname } = useLocation()

    const links = [
        { path: '/products/iphone-17-pro', label: 'iPhone' },
        { path: '/products/samsung-s24-ultra', label: 'Galaxy' },
        { path: '/products/google-pixel-9-pro', label: 'Pixel' },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-lg font-semibold tracking-tight text-black">
                        EMI Store
                    </Link>

                    <nav className="hidden sm:flex items-center gap-6">
                        {links.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-[13px] font-medium transition-colors ${pathname.includes(link.path) ? 'text-black' : 'text-gray-500 hover:text-black'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <Link
                    to="/orders"
                    className={`text-[13px] font-medium px-4 py-1.5 rounded-full border transition-all ${pathname === '/orders'
                            ? 'bg-black text-white border-black'
                            : 'text-gray-600 border-gray-200 hover:border-black hover:text-black'
                        }`}
                >
                    My Orders
                </Link>
            </div>
        </header>
    )
}
