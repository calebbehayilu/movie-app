import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movies }) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="p-4">
      <Link href={`/movie/${movies.id}`}>
        <Image
        className="rounded-lg"
          src={imagePath + movies.poster_path}
          width={200}
          height={200}
          alt={movies.title + " Poster"}
        />
        <div>
          <h1 className="w-52 pt-5">{movies.title}</h1>
        </div>
      </Link>
    </div>
  );
}
