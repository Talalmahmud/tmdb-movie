"use client";
import { Movie } from "@/type";
import React, { useEffect, useState } from "react";
import { addToWishlist, getLocalStorageData } from "../../utils/common";
import WishListCard from "@/components/WishListCard";

const Page = () => {
  const [wishList, setWishList] = useState<Movie[]>([]);
  const getLocalData = async () => {
    const cookidata: Movie[] = await getLocalStorageData();
    setWishList(cookidata);
  };
  const removeData = (item: Movie) => {
    addToWishlist(item);
    getLocalData();
  };

  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <div className=" w-full min-h-screen bg-white dark:bg-black">
      {" "}
      <div className=" w-full md:w-[736px] xl:w-[1100px] mx-auto px-6  text-white">
        <div className="w-full py-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-center justify-center">
          {wishList.length > 0 &&
            wishList.map((movie: Movie) => (
              <WishListCard key={movie.id} item={movie} remove={removeData} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
