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
        name: "Little Mischief",
        slug: "little mischief",
        imageUrl: "https://via.placeholder.com/40",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "little-mischief"
        ),
    },
    {
        name: "City Of Mercy",
        slug: "city of mercy",
        imageUrl: "https://via.placeholder.com/40",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "city-of-mercy"
        ),
    },
    {
        name: "MIME",
        slug: "mime",
        imageUrl: "https://via.placeholder.com/40",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "mime"
        ),
    },
    {
        name: "reshape",
        slug: "reshape",
        imageUrl: "https://via.placeholder.com/40",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "mime"
        ),
    },
    {
        name: "shelter",
        slug: "shelter",
        imageUrl: "https://via.placeholder.com/40",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "mime"
        ),
    },
    {
        name: "Le Petit Prince",
        slug: "le petit prince",
        imageUrl: "https://via.placeholder.com/40",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "mime"
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
];
