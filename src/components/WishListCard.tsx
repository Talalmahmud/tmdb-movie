"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { addToWishlist } from "../../utils/common";
import { Movie } from "@/type";

type Props = {
  item: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
  remove: (data: Movie) => void;
};

const WishListCard = ({ item, remove }: Props) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p/";
  const posterSize = "w500"; // Adjust the size as needed
  return (
    <div className=" w-full xl:w-[200px] dark:bg-white bg-slate-300  border-white border-[1px] flex flex-col gap-1 items-center rounded-md">
      <div className=" relative h-[200px] md:h-[180px]  w-full">
        <Image
          src={`${imgBaseUrl}${posterSize}${item.poster_path}`}
          fill
          alt="image"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-tl-md rounded-tr-md"
        />
      </div>
      <p className=" text-[12px] text-black font-semibold px-4 text-center">
        {item?.title?.slice(0, 40)}
      </p>

      <div
        onClick={() => {
          remove(item);
        }}
        className=" bg-blue-500 rounded-md px-2 py-1 text-[14px] text-white cursor-pointer"
      >
        Remove
      </div>
    </div>
  );
};

export default WishListCard;
