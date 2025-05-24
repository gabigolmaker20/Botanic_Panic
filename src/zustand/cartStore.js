    import { create } from "zustand";

    export const useCart = create((set) => ({
    items: [],
    
    // Añadir producto al carrito
    addToCart: (product) =>
        set((state) => {
        const exists = state.items.find((item) => item.id === product.id);
        if (exists) {
            return {
            items: state.items.map((item) =>
                item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            };
        }
        return {
            items: [...state.items, { ...product, quantity: 1 }],
        };
        }),
    
    // Eliminar producto del carrito
    removeFromCart: (id) =>
        set((state) => ({
        items: state.items.filter((item) => item.id !== id),
        })),
    
    // Actualizar cantidad de un producto específico
    updateQuantity: (id, newQuantity) =>
        set((state) => ({
        items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ),
        })),
    
    // Vaciar completamente el carrito
    clearCart: () => set({ items: [] }),
    
    // Función adicional útil: cambiar cantidad en +1 o -1
    adjustQuantity: (id, amount) =>
        set((state) => ({
        items: state.items.map((item) =>
            item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        ),
        })),
    }));