import { Product } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductCard(props: {
  addToCart: (productId: number, quantity: number) => {};
  product: Product;
}) {
  const product = props.product;
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {
    props.addToCart(product.id, quantity);
  };

  return (
    <div className="border-[1px] shadow w-[20rem] rounded-xl p-6 flex flex-col gap-3 h-fit">
      <div className="relative w-full aspect-square">
        <Image
          className="rounded-lg"
          fill={true}
          src={product.image}
          alt={product.name}
        />
      </div>

      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-xs">{product.brand}</p>
      <p className="text-s">{product.description}</p>
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-[1.5rem] mt-15">${product.price}</h3>
        <div className="flex flex-row gap-2">
          <input
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-10 bg-gray-200 text-center rounded-xl"
            type="number"
            defaultValue={1}
            min="1"
            step="1"
          />
          <button
            onClick={addToCart}
            className="bg-blue-500 hover:bg-blue-700 rounded-lg p-3 text-white font-semibold"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
