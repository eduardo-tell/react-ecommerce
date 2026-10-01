import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BadgeCount } from "../../../shared/components/BadgeCount";
import { IconAction } from "../../../shared/components/IconAction";
import { ROUTES } from "../../../shared/constants/routes";
import { selectFavoritesCount } from "../favoritesSelectors";

/** Atalho para página de favoritos com badge */
export function FavoritesLink() {
  const count = useSelector(selectFavoritesCount);
  const { pathname } = useLocation();
  const onFavoritesPage = pathname === ROUTES.favorites;

  return (
    <IconAction
      as={Link}
      to={ROUTES.favorites}
      label={`Favoritos${count ? `, ${count} produtos` : ""}`}
    >
      <img
        src={onFavoritesPage ? "/star-active.svg" : "/star.svg"}
        width={20}
        height={20}
        alt=""
      />
      <BadgeCount count={count} />
    </IconAction>
  );
}
