"use client";

import { Product } from "@prisma/client";
import React from "react";
import ProductCard from "./product-card";

export default function ProductArchive(props: {
  addToCart: (productId: number, quantity: number) => {};
  products: Product[];
}) {
  return (
    <section>
      <div className="flex flex-row gap-4">
        {props.products.map((product, index) => (
          <ProductCard
            addToCart={props.addToCart}
            key={index}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
