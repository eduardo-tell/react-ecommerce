import { Link } from "react-router-dom";
import { CartWidget } from "../../features/cart/components/CartWidget";
import { FavoritesLink } from "../../features/favorites/components/FavoritesLink";
import { SearchField } from "../../features/search/components/SearchField";
import { ROUTES } from "../../shared/constants/routes";

/** Cabeçalho global da loja */
export function SiteHeader() {
  return (
    <header>
      <div className="bg-secundary flex items-center justify-center p-2">
        <span className="text-xs">Lorem ipsum siamet</span>
      </div>

      <div className="container mx-auto py-7 px-4">
        <nav
          className="flex flex-nowrap justify-between items-center gap-2"
          aria-label="Navegação principal"
        >
          <Link to={ROUTES.home} className="font-bold text-4xl hover:text-primary transition-colors">
            <span className="hidden lg:inline">E-commerce</span>
            <span className="lg:hidden">E</span>
          </Link>

          <div className="flex items-center gap-2">
            <SearchField />
            <FavoritesLink />
            <CartWidget />
          </div>
        </nav>
      </div>
    </header>
  );
}
