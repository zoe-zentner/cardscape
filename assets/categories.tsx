import { Category } from "./types/category";
import { PRODUCTS } from "./products";

export const CATEGORIES: Category[] = [
    {
        name: "Pops",
        slug: "pops",
        imageUrl:
            "https://raw.githubusercontent.com/zent-z/rn-cards/refs/heads/main/assets/characters/box_img.webp",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "pops"
        ),
    },
    {
        name: "The Other One",
        slug: "the other one",
        imageUrl:
            "https://github.com/zent-z/rn-cards/blob/main/assets/images/the-other-one.jpg?raw=true",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "the other one"
        ),
    },
    {
        name: "Little Mischief",
        slug: "little mischief",
        imageUrl:
            "https://raw.githubusercontent.com/zent-z/rn-cards/refs/heads/main/assets/images/little-mischief.webp",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "little-mischief"
        ),
    },
    {
        name: "City Of Mercy",
        slug: "city of mercy",
        imageUrl:
            "https://github.com/zent-z/rn-cards/blob/main/assets/images/city-of-mercy.jpeg?raw=true",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "city-of-mercy"
        ),
    },
    {
        name: "MIME",
        slug: "mime",
        imageUrl:
            "https://github.com/zent-z/rn-cards/blob/main/assets/images/mime.jpeg?raw=true",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "mime"
        ),
    },
    {
        name: "reshape",
        slug: "reshape",
        imageUrl:
            "https://github.com/zent-z/rn-cards/blob/main/assets/images/reshape.jpg?raw=true",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "reshape"
        ),
    },
    {
        name: "shelter",
        slug: "shelter",
        imageUrl:
            "https://github.com/zent-z/rn-cards/blob/main/assets/images/shelter.jpg?raw=true",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "shelter"
        ),
    },
    {
        name: "Le Petit Prince",
        slug: "le petit prince",
        imageUrl:
            "https://raw.githubusercontent.com/zent-z/rn-cards/refs/heads/main/assets/images/le-petit-prince.webp",
        products: PRODUCTS.filter(
            (product) => product.category.slug === "le petit prince"
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
