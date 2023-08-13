import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const getMovie = async (movie) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();

  return data;
};

export default function MovieDetail() {
  const router = useRouter();

  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);

  const imagePath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const movieId = router.query.movieId;

    const gettingData = async () => {
      const movieData = await getMovie(movieId);

      if (movieData === null) {
        console.log("no data");
      }

      setLoading(false);
      setMovie(movieData);
      console.log(movie);
    };
    gettingData();
  }, [router]);

  return (
    <div className="flex justify-center">
      {loading === true ? (
        <h1>Loading . . . </h1>
      ) : (
        <div className="flex">
          <Image
            className="my-2 rounded-lg"
            src={imagePath + movie.poster_path}
            width={350}
            height={350}
          />

          <div className="p-6">
            <h5 className=" mb-2 text-2xl font-bold leading-tight text-neutral-800 dark:text-neutral-50">
              {movie.title}
            </h5>

            <span className="py-4">
              <h3 className="flex">
                {movie.release_date} • {movie.runtime + " min"} •
                {movie.genres?.map((gen) => (
                  <h1
                    className="px-2 mx-1 text-center rounded-lg text-white bg-green-600"
                    key={gen.id}
                  >
                    {gen.name}{" "}
                  </h1>
                ))}
              </h3>

              <h1>{movie.popularity}</h1>
            </span>
            <div>
              <h1 className="mt-4 font-semibold">Overview</h1>
              <p className="max-w-sm mt-2 mb-4 text-base">{movie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
