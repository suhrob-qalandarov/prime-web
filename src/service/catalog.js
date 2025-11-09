import axios from "./api.js"

const CategoryService = {

    // Get categories
    async getCategories() {
        try {
            const response = await axios.get(`/v1/category`)
            return response.data
        } catch (error) {
            console.error("Error fetching orders:", error)
            throw error
        }
    },

    async getCategoriesBySpotlightName(name) {
        try {
            const response = await axios.get(`/v1/category/${name}`)
            return response.data
        } catch (error) {
            console.error("Error fetching orders:", error)
            throw error
        }
    },

    async fetchCategories(selectedSpotlight) {
        try {
            let data
            if (selectedSpotlight) {
                data = await CategoryService.getCategoriesBySpotlightName(selectedSpotlight.name);
            } else {
                data = await CategoryService.getCategories();
            }
            localStorage.setItem("prime-categories", JSON.stringify(data))
        } catch (error) {
            console.error("Error fetching categories:", error)
        }
    },

    async getCategoriesFromLS(selectedSpotlight) {
        if (selectedSpotlight) {

        } else {

        }

        const categories = localStorage.getItem("prime-categories");
        if (categories) {
            try {
                const parsedCategories = JSON.parse(categories);
                console.log("Parsed categories from localStorage:", parsedCategories);
                return parsedCategories;
            } catch (error) {
                console.error("Failed to parse prime-categories:", error);
                return CategoryService.fetchCategories(selectedSpotlight)
            }
        }
    }
}

export default CategoryService