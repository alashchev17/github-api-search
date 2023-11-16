import { FC, useState, useEffect } from "react";
import {
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
} from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import { IUser } from "../models/models";
import RepoCard from "../components/RepoCard";

const HomePage: FC = () => {
  const [search, setSearch] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data, error } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    setIsDropdownVisible(debounced.length > 2 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && error && (
        <p className="text-center text-red-600">
          Oops! Something went wrong...
        </p>
      )}
      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isDropdownVisible && (
          <ul className="list-none absolute left-0 top-[45px] right-0 max-h-[200px] shadow-md bg-white overflow-auto">
            {isLoading && (
              <p className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors">
                Users are loading...
              </p>
            )}
            {data?.map((user: IUser) => (
              <li
                key={user.id}
                className="py-2 px-4 cursor-pointer hover:bg-gray-500 hover:text-white transition-colors"
                onClick={() => clickHandler(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container pb-2">
          {areReposLoading && (
            <p className="text-center">Repos are loading...</p>
          )}
          {!areReposLoading &&
            repos?.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
