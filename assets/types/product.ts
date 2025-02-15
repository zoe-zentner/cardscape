import { ImageSourcePropType } from "react-native";
import { Category } from "./category";

export type Product = {
    id: number;
    name: string;
    image: string;
    rarity: number;
    categoryId: number;
    owner: number;

    title: string;
    slug: string;
    imagesUrl: ImageSourcePropType[];
    price: number;
    heroImage: ImageSourcePropType;
    category: Omit<Category, "products">;
    maxQuantity: number;
};
