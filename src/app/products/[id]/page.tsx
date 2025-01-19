"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import React from "react";

export default function Product({ params }: { params: { id: string } }) {
  const { id } = React.use(params);
  const dispatch = useDispatch();

  /*   const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image, quantity }));
  }; */

  return <>Product {id}</>;
}
