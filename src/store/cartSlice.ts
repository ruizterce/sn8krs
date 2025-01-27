import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  category: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: number | string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Increment quantity if the item is already in the cart
      } else {
        state.items.push({ ...action.payload });
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; size?: number | string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          item.id + item.size !== action.payload.id + action.payload.size
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
        size?: number | string;
      }>
    ) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (
        existingItem &&
        action.payload.quantity > 0 &&
        action.payload.quantity < 100
      ) {
        console.log("item found");
        existingItem.quantity = action.payload.quantity;
      }
    },
    setCartState(state, action: PayloadAction<CartState>) {
      return action.payload;
    },
  },
});

export const selectTotalQuantity = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const calculateCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const { addToCart, removeFromCart, updateQuantity, setCartState } =
  cartSlice.actions;
export default cartSlice.reducer;
