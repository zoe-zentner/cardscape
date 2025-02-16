import { create } from "zustand";
import { getProducts } from "../api/api";

interface Product {
    id: number;
    name: string;
    image: string;
    owner: number; // 0 = not owned, 1 = owned
    categoryId: number;
}

interface ProductStore {
    products: Product[];
    fetchProducts: () => Promise<void>;
    updateProductOwnership: (productId: number) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],

    fetchProducts: async () => {
        const token = "CuD8bDWCJxSsFtx";
        try {
            const productData = await getProducts(token);
            set({ products: productData });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },

    updateProductOwnership: (productId) => {
        set((state) => ({
            products: state.products.map((product) =>
                product.id === productId ? { ...product, owner: 1 } : product
            ),
        }));
    },
}));
