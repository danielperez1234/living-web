"use client";

import useCartStore from "@/service/carrito/store";
import { Box, Input } from "@mui/material";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useCartStore();

  return (
    <Box
      marginY={"5%"}
      marginX={{ xs: "5%", md: "15%" }}
      mb={{ xs: "5%", md: "10%" }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
    >
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} style={{ marginBottom: "10px" }}>
              <h4>{product.name}</h4>
              <p>Price: ${product.price}</p>
              <p>
                Quantity:
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    updateQuantity(product, Number(e.target.value))
                  }
                />
              </p>
              <button onClick={() => removeFromCart(product)}>Remove</button>
            </div>
          ))}
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </Box>
  );
}
