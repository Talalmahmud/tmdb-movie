import { Movie } from "@/type";

export const getLocalStorageData = async () => {
  let cookidata: Movie[] = await JSON.parse(
    localStorage.getItem("wishlist") || "[]"
  );
  return cookidata;
};

export const addToWishlist = (item: Movie) => {
  let wishlist: Movie[] = JSON.parse(localStorage.getItem("wishlist") || "[]");

  const isInWishlist = wishlist.some((mitem: Movie) => mitem.id === item.id);

  if (isInWishlist) {
    wishlist = wishlist.filter((mitem: Movie) => mitem.id !== item.id);
    console.log(`Item ${item.id} removed from wishlist.`);
  } else {
    wishlist.push(item);
    console.log(`Item ${item.id} added to wishlist.`);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};
