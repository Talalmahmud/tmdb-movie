"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getLocalStorageData } from "@/utils/common";

const Navbar = () => {
  const [wishList, setWishList] = useState<any>([]);
  const [dark, setDark] = useState(false);

  // Function to handle dark mode toggle
  const darkModeHandler = () => {
    const newDarkMode = !dark;
    setDark(newDarkMode); // Update state
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode)); // Save preference
  };

  // Function to get data from cookies
  const getLocalData = async () => {
    const cookidata = await getLocalStorageData();
    console.log(cookidata);
    setWishList(cookidata);
  };

  // useEffect to manage dark mode class on body and initial state from localStorage
  useEffect(() => {
    const savedDarkMode = JSON.parse(
      localStorage.getItem("darkMode") || "false"
    );
    setDark(savedDarkMode); // Set initial dark mode state

    if (savedDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Fetch local data on mount
    getLocalData();
  }, []);

  // Update body class on dark mode change
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="w-full border-gray-800 bg-gray-200 dark:bg-slate-800 border-b-[1px]">
      <div className="w-full md:w-[736px] xl:w-[1100px] mx-auto px-6 xl:px-0 flex justify-between items-center py-6">
        <Link
          href="/"
          className=" text-black dark:text-white font-semibold text-[24px]"
        >
          Home
        </Link>

        <div className="flex gap-2">
          <button onClick={darkModeHandler}>
            {dark ? (
              <Image src={"/light.svg"} height={24} width={24} alt="" />
            ) : (
              <Image src={"/moon.svg"} height={24} width={24} alt="" />
            )}
          </button>
          <Link
            href="/wishlist"
            className="dark:text-white text-orange-600 font-semibold text-[16px]"
          >
            Wishlist ({wishList.length})
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
