"use client";
import { Movie } from "@/type";
import React from "react";
import { addToWishlist } from "../../utils/common";

type Props = {
  movie: Movie;
  title: string;
};

const AddWishList = ({ movie, title }: Props) => {
  const addtoWishlit = () => {
    addToWishlist(movie);
  };

  return (
    <>
      <button
        onClick={addtoWishlit}
        className=" bg-blue-500 rounded-md px-2 py-1 text-[14px] text-white cursor-pointer"
      >
        {title}
      </button>
    </>
  );
};

export default AddWishList;
