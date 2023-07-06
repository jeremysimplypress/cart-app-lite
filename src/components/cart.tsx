import Image from "next/image";
import React, { useEffect, useState } from "react";

import CartIcon from "public/cart.svg";
import BinIcon from "public/bin.svg";
import { CartItem, Product } from "@prisma/client";

export default function Cart(props: {
  cartItems: (CartItem & { product: Product })[];
  deleteItem: (productId: number) => void;
  updateItem: (productId: number, quantity: number) => void;
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="absolute top-0 right-10 flex flex-col gap-2 items-end">
      <div
        onClick={() => setShow(!show)}
        className="h-12 w-12 top-0 right-10 rounded-full shadow border-[1px] hover:border-slate-500 relative"
      >
        <Image className="p-3" src={CartIcon} alt="cart" />
        {props.cartItems.length > 0 && (
          <div className="absolute bg-blue-500 w-3 h-3 rounded-full p-[9px] top-[-4px] right-[-4px] text-xs font-bold text-white flex items-center justify-center">
            {props.cartItems.length}
          </div>
        )}
      </div>
      {show && props.cartItems.length > 0 && (
        <div
          id="dropdown"
          className="bg-white shadow-lg rounded-xl flex flex-col gap-3 p-3"
        >
          {props.cartItems.map((cartItem, index) => {
            const product = cartItem.product;
            return (
              <div key={index} className="flex flex-row gap-4 justify-between">
                <div className="relative h-20 w-20" key={index}>
                  <Image
                    className="rounded-lg"
                    fill={true}
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="flex flex-col gap-2 w-[8rem]">
                  <h2 className="text font-semibold">{product.name}</h2>
                  <p className="text-xs">{product.brand}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <input
                    onChange={(e) => {
                      props.updateItem(product.id, parseInt(e.target.value));
                    }}
                    className="w-10 h-10 bg-gray-200 text-center rounded-xl"
                    type="number"
                    defaultValue={cartItem.quantity}
                    min="1"
                    step="1"
                  />
                  <Image
                    onClick={() => props.deleteItem(product.id)}
                    src={BinIcon}
                    className="bg-red-500 hover:bg-red-700 hover:cursor-pointer w-10 h-10 rounded-lg p-3"
                    alt={""}
                  ></Image>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
