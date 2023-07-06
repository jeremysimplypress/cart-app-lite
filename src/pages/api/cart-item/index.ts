import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;

  if (req.method === "POST") {
    const { cartId, productId, quantity } = req.body;

    // check if cart item already exists
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cartId,
        productId: productId,
      },
    });

    if (cartItem) {
      // cartItem already exists, so update quantity
      result = await prisma.cartItem.update({
        where: {
          productId_cartId: {
            productId: productId,
            cartId: cartId,
          },
        },
        data: {
          quantity: cartItem.quantity + quantity,
        },
      });
    } else {
      // cartItem doesn't exists, create new cartItem
      result = await prisma.cartItem.create({
        data: {
          cartId: cartId,
          productId: productId,
          quantity: quantity,
        },
      });
    }
  }

  if (req.method === "PUT") {
    const { cartId, productId, quantity } = req.body;

    const result = await prisma.cartItem.update({
      where: {
        productId_cartId: {
          cartId: cartId,
          productId: productId,
        },
      },
      data: {
        quantity: quantity,
      },
    });

    res.json(result);
  }

  if (req.method === "DELETE") {
    const { cartId, productId } = req.body;

    const result = await prisma.cartItem.delete({
      where: {
        productId_cartId: {
          cartId: cartId,
          productId: productId,
        },
      },
    });

    res.json(result);
  }

  res.json(result);
}
