const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL

    // Fallback for production builds if VITE_API_URL is not provided
    if (window.location.hostname.includes('vercel.app')) {
        console.warn('⚠️ VITE_API_URL not found. Falling back to default Render API.')
        return 'https://onefi-0mme.onrender.com/api'
    }
    return '/api'
}

const BASE_URL = getBaseUrl()
console.log('📡 Frontend connecting to API at:', BASE_URL)

const handleResponse = async (res) => {
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || `HTTP error ${res.status}`)
    }
    return res.json()
}

export const api = {
    getAllProducts: async () => {
        const data = await handleResponse(await fetch(`${BASE_URL}/products`))
        return data.data
    },

    getProductBySlug: async (slug) => {
        const data = await handleResponse(await fetch(`${BASE_URL}/products/${slug}`))
        return data.data
    },

    getProductVariants: async (slug) => {
        const data = await handleResponse(await fetch(`${BASE_URL}/products/${slug}/variants`))
        return data.data
    },

    getEmiPlans: async (variantId) => {
        const data = await handleResponse(await fetch(`${BASE_URL}/emi-plans/${variantId}`))
        return data.data
    },

    createOrder: async (variantId, emiPlanId) => {
        const data = await handleResponse(await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ variantId, emiPlanId })
        }))
        return data.data
    },

    getOrders: async () => {
        const data = await handleResponse(await fetch(`${BASE_URL}/orders`))
        return data.data
    },

    cancelOrder: async (orderId) => {
        console.log(`📡 Attempting to cancel order: ${orderId} at ${BASE_URL}/orders/${orderId}/cancel`)
        const data = await handleResponse(await fetch(`${BASE_URL}/orders/${orderId}/cancel`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }))
        return data.data
    }
}

export default api
