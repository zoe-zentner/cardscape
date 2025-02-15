// groupProductsByCategory.ts
export const groupProductsByCategory = (products: any[]) => {
    const grouped = products.reduce((acc: Record<string, any[]>, product) => {
        const categoryName = product.categoryId.toString(); // Use categoryId for grouping

        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }

        acc[categoryName].push(product);

        return acc;
    }, {});

    return Object.keys(grouped).map((categoryId) => ({
        title: `Category ${categoryId}`, // Use category name if available
        data: grouped[categoryId],
    }));
};
