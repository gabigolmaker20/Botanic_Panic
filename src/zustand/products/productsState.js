import { create } from 'zustand';
import axios from 'axios';

const useProductsStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('http://localhost:3000/api/plantas');
            console.log('Productos desde zustand: ',response.data);
            set({ products: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    addProduct: async (newProduct) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('http://localhost:3000/products', newProduct);
            set((state) => ({
                products: [...state.products, response.data],
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    updateProduct: async (id, updatedProduct) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
            set((state) => ({
                products: state.products.map((product) =>
                    product.id === id ? response.data : product
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            set((state) => ({
                products: state.products.filter((product) => product.id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useProductsStore;