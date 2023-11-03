import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromToWatchIcon from "../components/cardIcons/removeFromWatch";
import WriteReview from "../components/cardIcons/writeReview";

const ToWatchMoviesPage = () => {
  const {toWatch: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  console.log(movieIds)
  const toWatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["toWatch", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = toWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = toWatchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Must Watch"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromToWatchIcon movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default ToWatchMoviesPage;