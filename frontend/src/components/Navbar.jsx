import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const { pathname } = useLocation()

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold tracking-tight text-black">
                    1Fi EMI Store
                </Link>

                <div className="hidden sm:block text-[13px] text-gray-500 font-medium">
                    Buy premium smartphones on easy EMI
                </div>

                <Link
                    to="/orders"
                    className="text-[13px] font-bold px-5 py-2 rounded-full border border-gray-100 bg-gray-50 hover:bg-black hover:text-white hover:border-black transition-all"
                >
                    {pathname === '/orders' ? 'Viewing Orders' : 'My Orders'}
                </Link>
            </div>
        </header>
    )
}
