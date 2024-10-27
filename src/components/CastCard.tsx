import { Person } from "@/type";
import Image from "next/image";
import React from "react";
const imgBaseUrl = "https://image.tmdb.org/t/p/";
const posterSize = "w500"; // Adjust the size as needed
const CastCard = ({ name, profile_path }: Person) => {
  return (
    <div className=" flex flex-col gap-1 shadow-md rounded-md">
      <div className=" relative h-[80px] w-[78px] ">
        <Image
          src={
            profile_path
              ? `${imgBaseUrl}${posterSize}${profile_path}`
              : "/no-image.jpg"
          }
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className=" rounded-tr-md rounded-tl-md"
          alt=""
        />
      </div>
      <p className=" text-black dark:text-white text-[12px] font-semibold text-center">
        {name}
      </p>
    </div>
  );
};

export default CastCard;
