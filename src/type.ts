import z from "zod";

export const searchSchema = z.object({
  name: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Cannot exceed 20 characters"),
});

export type SearchSchema = z.infer<typeof searchSchema>;

export const MovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

// You can also define a type from the schema
export type Movie = z.infer<typeof MovieSchema>;

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const ProductionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

const ProductionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

const SpokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

// Define the main Movie schema
export const MovieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z.null(), // If this could be an object, replace with the corresponding schema
  budget: z.number(),
  genres: z.array(GenreSchema),
  homepage: z.string().nullable(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  origin_country: z.array(z.string()).optional(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(ProductionCompanySchema),
  production_countries: z.array(ProductionCountrySchema),
  release_date: z.string(), // You might want to use a regex here to validate the date format
  revenue: z.number(),
  runtime: z.number().nullable(),
  spoken_languages: z.array(SpokenLanguageSchema),
  status: z.string(),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type Person = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};
