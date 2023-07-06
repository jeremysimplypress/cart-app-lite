import { CartItem, PrismaClient, Product } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ProductArchive from "@/components/product-archive";
import Cart from "@/components/cart";
import { useState } from "react";

const prisma = new PrismaClient();

const Home = (props: {
  cart: any;
  products: Product[];
  cartItems: (CartItem & { product: Product })[];
}) => {
  const [cartItems, setCartItems] = useState<
    (CartItem & { product: Product })[]
  >(props.cartItems);

  const addToCart = async (productId: number, quantity: number) => {
    console.log(
      `adding ${quantity} of product with id ${productId} to cart...`
    );
    try {
      const body = {
        cartId: props.cart.id,
        productId: productId,
        quantity: quantity,
      };
      const res = await fetch("/api/cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        console.log(
          `added ${quantity} of product with id ${productId} to cart!`
        );

        const addedProduct = props.products.find(
          (product) => product.id === productId
        );

        // check if product already in cart (frontend)
        const existingCartItem = cartItems.find(
          (cartItem) => cartItem.productId === productId
        );

        if (!existingCartItem) {
          // create new cartItem and add to cart
          const newCartItem = {
            product: props.products.find((product) => product.id === productId),
            productId: productId,
            cartId: props.cart.id,
            quantity: quantity,
          };
          setCartItems([
            ...cartItems,
            newCartItem as CartItem & { product: Product },
          ]);
        } else {
          // product already in cart, update quantity
          existingCartItem.quantity += quantity;
          setCartItems(cartItems);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromCart = async (productId: number) => {
    console.log(`deleting product with id ${productId} from cart...`);
    try {
      const body = {
        cartId: props.cart.id,
        productId: productId,
      };
      const res = await fetch("/api/cart-item", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        console.log(`deleted product with id ${productId} from cart!`);
        setCartItems(
          cartItems.filter((cartItem) => cartItem.productId != productId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (productId: number, quantity: number) => {
    console.log(
      `updating quanity of product with id ${productId} to ${quantity}...`
    );
    try {
      const body = {
        cartId: props.cart.id,
        productId: productId,
        quantity: quantity,
      };
      const res = await fetch("/api/cart-item", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        console.log(
          `updated quanity of product with id ${productId} to ${quantity}!`
        );
        const existingCartItem = cartItems.find(
          (cartItem) => cartItem.productId === productId
        );
        if (existingCartItem) {
          existingCartItem.quantity += quantity;
          setCartItems(cartItems);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="p-10 flex flex-col items-center">
      <div className="flex items-center flex-col gap-10 relative w-fit">
        <h1 className="font-bold text-[2rem]">Programmer Essentials</h1>
        <ProductArchive addToCart={addToCart} products={props.products} />
        <Cart
          updateItem={updateCartItem}
          deleteItem={deleteFromCart}
          cartItems={cartItems}
        />
      </div>
    </section>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const cart = await prisma.cart.findFirst();
  const products = await prisma.product.findMany();
  let cartItems;
  if (cart) {
    cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        product: true,
      },
    });
  }

  return {
    props: { cart, products, cartItems },
  };
};
