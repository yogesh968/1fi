import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const { pathname } = useLocation()
    const isHomePage = pathname === '/'

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link to="/" className="text-xl font-semibold tracking-tight text-black">
                        1Fi EMI Store
                    </Link>
                </div>

                <Link
                    to="/orders"
                    className="text-[13px] font-semibold px-5 py-2 rounded-full border border-gray-100 bg-white hover:border-black transition-all"
                >
                    My Orders
                </Link>
            </div>
        </header>
    )
}
