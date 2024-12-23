import { Product } from "../../assets/types/product";

export const groupProductsByCategory = (products: Product[]) => {
    const grouped = products.reduce(
        (acc: Record<string, Product[]>, product) => {
            const categoryName = product.category.name;
            if (!acc[categoryName]) {
                acc[categoryName] = [];
            }
            acc[categoryName].push(product);
            return acc;
        },
        {}
    );

    return Object.keys(grouped).map((category) => ({
        title: category,
        data: grouped[category],
    }));
};
