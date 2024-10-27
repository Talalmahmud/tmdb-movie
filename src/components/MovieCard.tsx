"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
};

const MovieCard = ({ item }: Props) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p/";
  const posterSize = "w500"; // Adjust the size as needed
  return (
    <Link
      href={`/${item?.id}`}
      className=" w-[200px] dark:bg-white bg-slate-300 border-white border-[1px]  flex flex-col gap-1 items-center rounded-md"
    >
      <div className=" relative h-[200px] md:h-[180px]  w-full">
        <Image
          src={
            item.poster_path
              ? `${imgBaseUrl}${posterSize}${item.poster_path}`
              : "/no-image.jpg"
          }
          fill
          alt="image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="rounded-tl-md rounded-tr-md shadow-md"
        />
      </div>
      <p className=" text-[12px] text-black font-semibold px-4 py-2 text-center">
        {item?.title?.slice(0, 40)}
      </p>
    </Link>
  );
};

export default MovieCard;
