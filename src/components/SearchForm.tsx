"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, SearchSchema } from "@/type";

type Props = {
  onSubmit: (data: SearchSchema) => void | Promise<void>;
};

const SearchForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({ resolver: zodResolver(searchSchema) });

  const handleSearchSubmit: SubmitHandler<SearchSchema> = (data) => {
    onSubmit(data);
  };

  return (
    <div className="py-4">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleSearchSubmit)}
      >
        <div className="flex flex-row">
          <div className="flex flex-col gap-1">
            <input
              className="text-[16px] w-full dark:bg-white bg-gray-300 sm:w-[350px] md:w-[450px] px-4 h-[32px] outline-none  text-black"
              {...register("name")}
              placeholder="Search by title"
            />
            {errors.name && (
              <span className="text-red-400">{errors.name.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="rounded-tr-md rounded-br-md px-4 flex justify-center h-[32px] items-center bg-green-500 text-white"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
