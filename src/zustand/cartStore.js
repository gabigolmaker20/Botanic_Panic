    import { create } from "zustand";

    // Leer carrito de localStorage al iniciar
    const getInitialCart = () => {
    const stored = localStorage.getItem("cart_items");
    return stored ? JSON.parse(stored) : [];
    };

    export const useCart = create((set) => ({
    items: getInitialCart(),

    addToCart: (product) =>
        set((state) => {
        const exists = state.items.find((item) => item.id === product.id);
        let newItems;
        if (exists) {
            newItems = state.items.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        } else {
            newItems = [...state.items, { ...product, quantity: 1 }];
        }
        localStorage.setItem("cart_items", JSON.stringify(newItems));
        return { items: newItems };
        }),

    removeFromCart: (id) =>
        set((state) => {
        const newItems = state.items.filter((item) => item.id !== id);
        localStorage.setItem("cart_items", JSON.stringify(newItems));
        return { items: newItems };
        }),

    updateQuantity: (id, newQuantity) =>
        set((state) => {
        const newItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem("cart_items", JSON.stringify(newItems));
        return { items: newItems };
        }),

    clearCart: () => {
        localStorage.removeItem("cart_items");
        set({ items: [] });
    },

    adjustQuantity: (id, amount) =>
        set((state) => {
        const newItems = state.items.map((item) =>
            item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        );
        localStorage.setItem("cart_items", JSON.stringify(newItems));
        return { items: newItems };
        }),
    }));