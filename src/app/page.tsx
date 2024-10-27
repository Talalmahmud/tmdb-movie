"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Movie, SearchSchema } from "@/type";
import SearchForm from "@/components/SearchForm";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<SearchSchema | null>(null);
  const [result, setResult] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialLoad = useRef(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true); // Track if it's the first search

  const initialFetch = async (pageNumber = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
          params: { page: pageNumber },
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_KEY}`,
          },
        }
      );
      const responseData = await response.data;
      setResult((prevResults) => [...prevResults, ...responseData.results]);
      setTotalPage(responseData.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Error fetching movies. Please try again.");
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (data: SearchSchema, pageNumber = 1) => {
    setSearchQuery(data);
    setLoading(true);
    setError(null);
    if (isFirstSearch) {
      setIsFirstSearch(false); // Mark that the first search has been done
      setResult([]);
    }

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        {
          params: { query: data.name, page: isFirstSearch ? 1 : pageNumber }, // Fetch 1 result on the first search
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_KEY}`,
          },
        }
      );
      const responseData = await response.data;
      setResult((prevResults) => [...prevResults, ...responseData.results]);
      setTotalPage(responseData.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Error fetching search results. Please try again.");
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    if (searchQuery) {
      handleSearchSubmit(searchQuery, nextPage);
    } else {
      initialFetch(nextPage);
    }
  };

  useEffect(() => {
    if (!initialLoad.current) {
      initialLoad.current = true;
      initialFetch();
    }
  }, []);

  return (
    <div className=" w-full bg-white dark:bg-black">
      {" "}
      <div className=" w-full md:w-[736px] xl:w-[1100px] mx-auto ">
        <div className=" w-full flex flex-col gap-2 justify-center items-center">
          <SearchForm onSubmit={handleSearchSubmit} />
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="w-full py-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 items-center justify-center">
            {result.length > 0
              ? result.map((movie: Movie) => (
                  <MovieCard key={movie.id} item={movie} />
                ))
              : !loading && <p>No results found.</p>}
          </div>
          {totalPage > page && !loading && (
            <button
              onClick={loadMore}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
