import { FC } from "react";
import { Link } from "react-router-dom";

const Navigation: FC = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-500 h-[50px] shadow-md px-5 text-white">
      <h3>Github Search</h3>

      <span>
        <Link to="/" className="mr-2">
          Home
        </Link>
        <Link to="/favourites">Favourites</Link>
      </span>
    </nav>
  );
};

export default Navigation;
