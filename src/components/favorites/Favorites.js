import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavoritesCount } from "../../features/favorites/selectors";
import { Button, Count } from "../buttonCount/styles.tsx";

export default function Favorites({ icon }) {
  const favoritesCount = useSelector(selectFavoritesCount)

  return (
    <Button
      as={Link}
      to="/favoritos"
      className="p-2 border-transparent border-b-2 hover:border-gray-400 transition-all duration-250 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
      aria-label={`Favoritos${favoritesCount > 0 ? `, ${favoritesCount} produtos` : ""}`}
    >
      <img src={icon} alt="" width="20" height="20" />
      {favoritesCount > 0 && <Count aria-hidden="true"> {favoritesCount} </Count>}
    </Button>
  )
}
