import axios from "./api.js"

const ProductService = {
    async getProducts(limit = 20) {
        try {
            const response = await axios.get(`/v1/product?limit=${limit}`)
            return response.data
        } catch (error) {
            console.error("Error fetching orders:", error)
            throw error
        }
    },

    async getProductsByCategoryId(categoryId, limit = 20) {
        try {
            const response = await axios.get(`/v1/product/by-category/${categoryId}?limit=${limit}`)
            return response.data
        } catch (error) {
            console.error("Error fetching orders:", error)
            throw error
        }
    },

    async getProductById(productId) {
        try {
            const response = await axios.get(`/v2/product/${productId}`)
            return response.data
        } catch (error) {
            console.error("Error fetching product:", error)
            throw error
        }
    },
}

export default ProductService