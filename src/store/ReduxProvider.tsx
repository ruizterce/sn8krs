"use client"; // Mark this as a Client Component

import { Provider } from "react-redux";
import { store } from "./index";

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}
