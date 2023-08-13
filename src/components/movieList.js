import { useEffect, useState } from "react";
import MovieCard from "./movieCard";

const getMovie = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`
  );
  const data = await res.json();

  return data;
};
const getUpcomingMovie = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`
  );
  const data = await res.json();

  return data;
};

const getTopRatedMovie = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`
  );
  const data = await res.json();

  return data;
};

export default function MovieList() {
  const [movies, setMoviesJson] = useState();
  const [loading, setLoading] = useState(true);
  const [openTab, setOpenTab] = useState(1);

  useEffect(() => {
    const gettingData = async () => {
      if (openTab === 1) {
        const movieData = await getMovie();

        setLoading(false);
        setMoviesJson(movieData);
      }
      if (openTab === 2) {
        setMoviesJson(null);
        setLoading(true);

        const movieData = await getTopRatedMovie();

        setLoading(false);
        setMoviesJson(movieData);
      }
      if (openTab === 3) {
        setMoviesJson(null);
        setLoading(true);

        const movieData = await getUpcomingMovie();

        setLoading(false);
        setMoviesJson(movieData);
      }
    };
    gettingData();
  }, [openTab]);

  return (
    <div className="flex flex-col align-middle">
      <h1>Movies</h1>

      <div className=" w-48">
        <ul className="flex mb-0 list-none pt-3 pb-4" role="tablist">
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 rounded block leading-normal " +
                (openTab === 1 ? "text-gray-800 bg-white" : "")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Popular
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "w-32 text-xs font-bold uppercase px-5 py-3 rounded block leading-normal " +
                (openTab === 2 ? "text-gray-800 bg-white" : "")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Top Rated
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 rounded block leading-normal " +
                (openTab === 3 ? "text-gray-800 bg-white" : "")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(3);
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              Upcoming
            </a>
          </li>
        </ul>
      </div>

      {loading === false ? (
        <div className="relative min-w-0 break-wordsw-full mb-6 rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div
                className={openTab === 1 ? "flex justify-center " : "hidden"}
                id="link1"
              >
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
                  {movies.results.map((movie) => (
                    <MovieCard key={movie.id} movies={movie} />
                  ))}
                </div>
              </div>
              <div
                className={openTab === 2 ? "flex justify-center" : "hidden"}
                id="link2"
              >
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
                  {movies.results.map((movie) => (
                    <MovieCard key={movie.id} movies={movie} />
                  ))}
                </div>
              </div>
              <div
                className={openTab === 3 ? "flex justify-center" : "hidden"}
                id="link3"
              >
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
                  {movies.results.map((movie) => (
                    <MovieCard key={movie.id} movies={movie} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="px-4 py-5 flex-auto">Loading . . . </h1>
      )}
    </div>
  );
}
