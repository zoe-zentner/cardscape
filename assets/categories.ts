import { Category } from "./types/category";
import { PRODUCTS } from "./products";

export const CATEGORIES: Category[] = [
    {
        name: "Pops",
        slug: "pops",
        imageUrl: "https://via.placeholder.com/40",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "pops"
        ),
    },
    {
        name: "The Other One",
        slug: "the other one",
        imageUrl: "https://via.placeholder.com/40",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "the other one"
        ),
    },
    {
        name: "Phones",
        slug: "phones",
        imageUrl:
            "https://images.pexels.com/photos/40739/mobile-phone-smartphone-tablet-white-40739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "phones"
        ),
    },
    {
        name: "Gaming",
        slug: "gaming",
        imageUrl:
            "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "gaming"
        ),
    },
    {
        name: "Accessories",
        slug: "accessories",
        imageUrl:
            "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "accessories"
        ),
    },
];
