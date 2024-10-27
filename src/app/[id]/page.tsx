import Image from "next/image";
import { Movie } from "@/type";
import { Person } from "../../type";
import dynamic from "next/dynamic";
const AddWishList = dynamic(() => import("@/components/AddWishList"));
const CastCard = dynamic(() => import("@/components/CastCard"), { ssr: true });
const MovieCard = dynamic(() => import("@/components/MovieCard"), {
  ssr: true,
});

const imgBaseUrl = "https://image.tmdb.org/t/p/";
const posterSize = "w500";

const Page = async ({ params }: { params: { id: string } }) => {
  let movieDetails;
  let relateMovies;
  let castData;


  // Fetch movie details
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        next: {
          revalidate: 10,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    movieDetails = await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    movieDetails = null;
  }
  // fetch movie recommendations
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        next: {
          revalidate: 10,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    relateMovies = responseData?.results;
  } catch (error) {
    console.error("Error fetching related movies:", error);
    relateMovies = null;
  }

  //cast data
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params?.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        next: {
          revalidate: 10,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    // console.log(response.json());
    castData = responseData?.cast;
  } catch (error) {
    console.error("Error fetching related movies:", error);
    castData = null;
  }

  return (
    <div className=" w-full bg-white dark:bg-black">
      <div className="bg-white dark:bg-gray-800 w-full sm:w-[375px] md:w-[736px] xl:w-[1100px] mx-auto text-white min-h-screen flex flex-col items-center p-6">
        {movieDetails ? (
          <div className="max-w-4xl bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row mb-10">
            <Image
              src={`${imgBaseUrl}${posterSize}${movieDetails.poster_path}`}
              height={450}
              width={300}
              alt={movieDetails.title}
              className="object-cover"
            />
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl text-black dark:text-white font-bold mb-2">
                  {movieDetails.title}
                </h1>
                <p className="text-gray-400 mb-4">{movieDetails.overview}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {movieDetails?.genres?.map(
                    (item: { id: number; name: string }, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded"
                      >
                        {item.name}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className=" flex flex-col gap-1">
                <div>
                  <AddWishList
                    movie={movieDetails}
                  />
                </div>
                <div className=" text-black dark:text-white">
                  <p className="text-lg">
                    <span className="font-bold">Release Date:</span>{" "}
                    {movieDetails.release_date}
                  </p>
                </div>
                {/* <p>{castData}</p> */}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-400">Movie details not found.</p>
        )}

        {castData?.length > 0 && (
          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Top Cast
            </h2>
            <div className="flex w-full overflow-x-auto gap-4 pb-4">
              {castData.map((movie: Person) => (
                <CastCard
                  key={movie?.id}
                  name={movie?.name}
                  profile_path={movie?.profile_path}
                  adult={false}
                  gender={0}
                  id={0}
                  known_for_department={""}
                  original_name={""}
                  popularity={0}
                  credit_id={""}
                  department={""}
                  job={""}
                />
              ))}
            </div>
          </div>
        )}

        {relateMovies?.length > 0 && (
          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Recomendation Movies
            </h2>
            <div className="flex w-full overflow-x-auto gap-4 pb-4">
              {relateMovies.map((movie: Movie) => (
                <div className=" flex-1 w-full" key={movie.id}>
                  <MovieCard item={movie} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
