"use client";
import { Movie } from "@/type";
import { addToWishlist, getLocalStorageData } from "@/utils/common";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  movie: Movie;
};

const AddWishList = ({ movie }: Props) => {
  const [isWishlist, setIsWishList] = useState<boolean>(false);
  const getLocalWishlist = useCallback(async () => {
    try {
      const response = await getLocalStorageData();
      const isMovie = response?.some((item: Movie) => item?.id === movie?.id);
      setIsWishList(isMovie);
    } catch (error) {
      console.log(error);
    }
  }, [movie?.id]);

  const addtoWishlit = () => {
    addToWishlist(movie);
    getLocalWishlist();
  };

  useEffect(() => {
    getLocalWishlist();
  }, [getLocalWishlist]);

  return (
    <>
      <button
        onClick={addtoWishlit}
        className=" bg-blue-500 rounded-md px-2 py-1 text-[14px] text-white cursor-pointer"
      >
        {isWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
      </button>
    </>
  );
};

export default AddWishList;
