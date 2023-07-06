import { Prisma } from "@prisma/client";

const products = [
  {
    name: "Deodarant",
    brand: "Lynx",
    description: "You really need this bro, please just buy this..",
    price: 4.95,
    image: "/images/deodarant.jpg",
  },
  {
    name: "Grey T-Shirt",
    brand: "Kmart",
    description: "A programmer staple choice. You can't go wrong with this one",
    price: 22.95,
    image: "/images/shirt.jpg",
  },
  {
    name: "Chiropractor",
    brand: "Dr Jeff",
    description: "This is cheaper than most standing desks...",
    price: 55.95,
    image: "/images/chiro.jpg",
  },
  {
    name: "Ruan's opinion on rust",
    description:
      "This is free, in fact you don't even need to buy this because I'm sure you've already had it",
    price: 0.0,
    image: "/images/ruan.jpg",
  },
];

export default products;
