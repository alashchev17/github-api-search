import React, { useState } from "react";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { favourites } = useAppSelector((state) => state.github);

  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(repo.html_url),
  );

  const { addFavourite, removeFavourite } = useActions();

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo.html_url);
    setIsFavourite((prev) => !prev);
  };

  const removeFromFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setIsFavourite((prev) => !prev);
  };

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:bg-gray-100 hover:shadow-md transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Stars: <span className="font-bold mr-2">{repo.stargazers_count}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
      </a>
      {isFavourite ? (
        <button
          className="mt-2 py-2 px-4 rounded bg-red-400 text-white hover:shadow-md transition-all"
          onClick={removeFromFavourites}
        >
          Remove from favourites
        </button>
      ) : (
        <button
          className="mt-2 py-2 px-4 rounded bg-yellow-400 hover:shadow-md transition-all"
          onClick={addToFavourite}
        >
          Add to favourites
        </button>
      )}
    </div>
  );
};

export default RepoCard;
