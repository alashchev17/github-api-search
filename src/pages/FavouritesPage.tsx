import { FC } from "react";
import { useAppSelector } from "../hooks/redux";

const FavouritesPage: FC = () => {
  const { favourites } = useAppSelector((state) => state.github);

  if (favourites.length === 0)
    return (
      <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
        <p className="text-center font-bold text-lg">
          List of favourite repos is empty!
        </p>
      </div>
    );

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      <ul className="list-none">
        {favourites.map((f) => (
          <li key={f}>
            <a href={f} target="_blank">
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavouritesPage;
