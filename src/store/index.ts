import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import { saveState } from "@/lib/localStorage";

export const store = configureStore({
  reducer: { auth: authReducer, cart: cartReducer },
});

// Save the state whenever it changes
store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
