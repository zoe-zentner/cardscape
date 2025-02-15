export const groupProductsByCategory = (products: any[], categories: any[]) => {
    const grouped = products.reduce((acc: Record<string, any[]>, product) => {
        const categoryId = product.categoryId.toString(); // Group by categoryId

        if (!acc[categoryId]) {
            acc[categoryId] = [];
        }

        acc[categoryId].push(product);

        return acc;
    }, {});

    // Now map the categoryId to the category name
    return Object.keys(grouped).map((categoryId) => {
        // Find the corresponding category name for the current categoryId
        const category = categories.find(cat => cat.id.toString() === categoryId);

        // Use category name if available
        const categoryName = category ? category.name : `Category ${categoryId}`;

        return {
            title: categoryName,  // Use category name as the title
            data: grouped[categoryId],
        };
    });
};

